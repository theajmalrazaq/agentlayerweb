import {
	AgentAction,
	AgentApp,
	AgentEntity,
	AgentField,
	AgentForm,
	AgentPage,
	AgentSection,
} from "@agentlayerweb/react";
import { useState } from "react";

export default function App() {
	const [todos, setTodos] = useState([
		{ id: "1", task: "Review AgentLayerWeb specs" },
		{ id: "2", task: "Implement Core Primitives" },
	]);
	const [taskName, setTaskName] = useState("");

	const addTodo = () => {
		if (!taskName) return;
		setTodos((prev) => [...prev, { id: String(Date.now()), task: taskName }]);
		setTaskName("");
	};

	return (
		<AgentApp name="Todo Dashboard" version="1.0.0">
			<AgentPage id="dashboard" title="Dashboard Page">
				<div className="max-w-150 mx-auto">
					<h1>AgentLayerWeb React Todo App</h1>

					<AgentSection id="editor" title="Creator Section">
						<div className="bg-[#1e293b] p-5 rounded-lg mb-5">
							<AgentForm purpose="Add New Todo">
								<div className="flex gap-2.5">
									<AgentField
										name="task"
										type="text"
										label="Task Name"
										required
									>
										<input
											type="text"
											placeholder="Enter task..."
											value={taskName}
											onChange={(e) => setTaskName(e.target.value)}
											className="p-2.5 rounded border border-[#475569] bg-[#0f172a] text-white grow"
										/>
									</AgentField>

									<AgentAction
										id="add_task_action"
										intent="submit"
										priority="primary"
									>
										<button
											type="button"
											onClick={addTodo}
											className="bg-[#3b82f6] border-none text-white py-2.5 px-5 rounded cursor-pointer"
										>
											Add
										</button>
									</AgentAction>
								</div>
							</AgentForm>
						</div>
					</AgentSection>

					<AgentSection id="list" title="Items Section">
						<h2>Current Tasks</h2>
						<div>
							{todos.map((todo) => (
								<AgentEntity key={todo.id} type="Task" id={todo.id}>
									<div className="flex justify-between p-3 border-b border-[#334155] bg-[#1e293b] my-2 rounded-md">
										<span>{todo.task}</span>

										<AgentAction
											id={`delete_${todo.id}`}
											intent="delete"
											destructive
										>
											<button
												type="button"
												onClick={() =>
													setTodos((prev) =>
														prev.filter((t) => t.id !== todo.id),
													)
												}
												className="bg-[#ef4444] border-none text-white py-1 px-2.5 rounded cursor-pointer"
											>
												Delete
											</button>
										</AgentAction>
									</div>
								</AgentEntity>
							))}
						</div>
					</AgentSection>
				</div>
			</AgentPage>
		</AgentApp>
	);
}
