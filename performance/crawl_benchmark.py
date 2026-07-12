import asyncio
import json
import os
import time
import tiktoken
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler

HUMAN_URL = "https://theajmalrazaq.github.io/agentlayerweb/example/human"
AGENT_URL = "https://theajmalrazaq.github.io/agentlayerweb/example/agentlayerweb"
COST_PER_M_INPUT = 0.075 / 1000000

async def measure_run(crawler, url, enc):
    t0 = time.time()
    res = await crawler.arun(url=url)
    duration = time.time() - t0
    
    if not res.success:
        raise Exception(f"Failed to crawl {url}: {res.error_message}")
        
    soup = BeautifulSoup(res.html, "html.parser")
    form_el = soup.find("form", id="new-client-form")
    form_str = str(form_el) if form_el else ""
    
    # Strip classes/styles
    soup_no_class = BeautifulSoup(res.html, "html.parser")
    for el in soup_no_class.find_all(True):
        if hasattr(el, "attrs") and el.attrs:
            if "class" in el.attrs:
                del el.attrs["class"]
            if "style" in el.attrs:
                del el.attrs["style"]
        if el.name in ["script", "style", "svg", "path"]:
            el.decompose()
    stripped_str = str(soup_no_class)
    
    # Strip classes/styles from form
    form_no_class = BeautifulSoup(form_str, "html.parser")
    for el in form_no_class.find_all(True):
        if hasattr(el, "attrs") and el.attrs:
            if "class" in el.attrs:
                del el.attrs["class"]
            if "style" in el.attrs:
                del el.attrs["style"]
    form_stripped_str = str(form_no_class)
    
    return {
        "duration": duration,
        "raw_tokens": len(enc.encode(res.html)),
        "stripped_tokens": len(enc.encode(stripped_str)),
        "form_tokens": len(enc.encode(form_str)),
        "form_stripped_tokens": len(enc.encode(form_stripped_str))
    }

async def main():
    enc = tiktoken.encoding_for_model("gpt-4o")
    human_runs = []
    agent_runs = []
    
    print("Starting Crawl4AI 3-run benchmark to get precise averages...")
    
    async with AsyncWebCrawler() as crawler:
        for i in range(3):
            print(f"Run {i+1}/3...")
            h_metrics = await measure_run(crawler, HUMAN_URL, enc)
            a_metrics = await measure_run(crawler, AGENT_URL, enc)
            human_runs.append(h_metrics)
            agent_runs.append(a_metrics)
            await asyncio.sleep(0.5)
            
    # Calculate averages
    avg_h = {k: sum(run[k] for run in human_runs)/3 for k in human_runs[0].keys()}
    avg_a = {k: sum(run[k] for run in agent_runs)/3 for k in agent_runs[0].keys()}
    
    cost_h_raw = avg_h["raw_tokens"] * COST_PER_M_INPUT
    cost_a_stripped = avg_a["stripped_tokens"] * COST_PER_M_INPUT
    
    cost_h_form = avg_h["form_tokens"] * COST_PER_M_INPUT
    cost_a_form_stripped = avg_a["form_stripped_tokens"] * COST_PER_M_INPUT
    
    results = {
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "full_page": {
            "human": {
                "duration": round(avg_h["duration"], 3),
                "tokens": int(avg_h["raw_tokens"]),
                "cost": round(cost_h_raw, 8)
            },
            "agent": {
                "duration": round(avg_a["duration"], 3),
                "tokens": int(avg_a["stripped_tokens"]),
                "cost": round(cost_a_stripped, 8)
            },
            "savings": {
                "speedup": f"{(avg_h['duration'] / avg_a['duration']):.2f}x",
                "token_savings_pct": round(((avg_h['raw_tokens'] - avg_a['stripped_tokens']) / avg_h['raw_tokens']) * 100, 1),
                "cost_savings_pct": round(((cost_h_raw - cost_a_stripped) / cost_h_raw) * 100, 1)
            }
        },
        "form_only": {
            "human": {
                "tokens": int(avg_h["form_tokens"]),
                "cost": round(cost_h_form, 8)
            },
            "agent": {
                "tokens": int(avg_a["form_stripped_tokens"]),
                "cost": round(cost_a_form_stripped, 8)
            },
            "savings": {
                "token_savings_pct": round(((avg_h['form_tokens'] - avg_a['form_stripped_tokens']) / avg_h['form_tokens']) * 100, 1),
                "cost_savings_pct": round(((cost_h_form - cost_a_form_stripped) / cost_h_form) * 100, 1)
            }
        }
    }
    
    # Save raw JSON
    output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../docs/crawl4ai-benchmark-results.json"))
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
        
    print(f"\nSaved raw Crawl4AI benchmark results to: {output_path}")
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
