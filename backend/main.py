from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Build adjacency list
    adj = {node['id']: [] for node in nodes}
    in_degree = {node['id']: 0 for node in nodes}
    
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adj and target in adj: # Basic validation
            adj[source].append(target)
            in_degree[target] += 1


    queue = [node_id for node_id in adj if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        u = queue.pop(0)
        visited_count += 1
        
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    is_dag = visited_count == num_nodes

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
