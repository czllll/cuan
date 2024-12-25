# main.py

import json
from fastapi import FastAPI

# 初始化 FastAPI 实例
app = FastAPI()

# 示例配件数据库 (后续可替换为实际数据库或文件读取)
components = [
    {"id": 1, "name": "AMD Ryzen 5 7600X", "category": "CPU", "price": 1700, "usage": ["gaming", "design"]},
    {"id": 2, "name": "Intel i5-13600K", "category": "CPU", "price": 1800, "usage": ["gaming", "development"]},
    {"id": 3, "name": "NVIDIA RTX 3060 Ti", "category": "GPU", "price": 3300, "usage": ["gaming"]},
    {"id": 4, "name": "MSI B550", "category": "Motherboard", "price": 800, "usage": ["gaming", "design"]},
    {"id": 5, "name": "Corsair 16GB DDR4 3200MHz", "category": "RAM", "price": 500,
     "usage": ["gaming", "design", "development"]},
]


# 1. 规则过滤层
def filter_components_by_budget(components, budget_min, budget_max):
    return [comp for comp in components if budget_min <= comp['price'] <= budget_max]


def filter_components_by_usage(components, usage):
    return [comp for comp in components if usage in comp['usage']]


# 2. 案例匹配层
def match_case(user_input, history_cases):
    """
    示例案例匹配逻辑: 找到历史案例中预算和用途最相近的案例
    """
    user_budget = (user_input['budget']['min'], user_input['budget']['max'])
    user_usage = user_input['usage']

    # 简单匹配逻辑 (可扩展为基于相似度计算的算法)
    matched_cases = []
    for case in history_cases:
        case_budget = (case['budget']['min'], case['budget']['max'])
        if user_budget[0] <= case_budget[1] and user_budget[1] >= case_budget[0] and user_usage == case['usage']:
            matched_cases.append(case)
    return matched_cases


# 示例历史案例
history_cases = [
    {"id": 1, "components": ["AMD Ryzen 5 7600X", "NVIDIA RTX 3060 Ti", "MSI B550", "Corsair 16GB DDR4 3200MHz"],
     "budget": {"min": 5000, "max": 7000}, "usage": "gaming"},
    {"id": 2, "components": ["Intel i5-13600K", "NVIDIA RTX 3060 Ti", "MSI B550", "Corsair 16GB DDR4 3200MHz"],
     "budget": {"min": 6000, "max": 8000}, "usage": "development"},
]


# 3. 模型推荐层
def recommend_with_model(user_input):
    """
    示例模型推荐逻辑: 假设模型直接输出推荐组件列表
    """
    # 这里可以集成实际的机器学习模型
    recommended_components = [
        {"id": 1, "name": "AMD Ryzen 5 7600X", "category": "CPU", "price": 1700},
        {"id": 3, "name": "NVIDIA RTX 3060 Ti", "category": "GPU", "price": 3300},
        {"id": 4, "name": "MSI B550", "category": "Motherboard", "price": 800},
        {"id": 5, "name": "Corsair 16GB DDR4 3200MHz", "category": "RAM", "price": 500},
    ]
    return recommended_components


@app.post("/recommend")
def recommend(user_input: dict):
    """
    接收用户需求并返回推荐方案。
    输入示例：
    {
        "budget": {"min": 5000, "max": 7000},
        "usage": "gaming"
    }
    """
    # 提取用户需求
    budget_min = user_input["budget"]["min"]
    budget_max = user_input["budget"]["max"]
    usage = user_input["usage"]

    # 1. 规则过滤
    filtered_by_budget = filter_components_by_budget(components, budget_min, budget_max)
    filtered_by_usage = filter_components_by_usage(filtered_by_budget, usage)

    # 2. 案例匹配
    matched_cases = match_case(user_input, history_cases)

    # 3. 模型推荐
    model_recommendation = recommend_with_model(user_input)

    # 综合推荐结果
    return {
        "rule_based_recommendation": filtered_by_usage,
        "case_based_recommendation": matched_cases,
        "model_based_recommendation": model_recommendation
    }


# 示例输入与测试
if __name__ == "__main__":
    # 示例 JSON 输入
    user_input = {
        "budget": {"min": 5000, "max": 7000},
        "usage": "gaming"
    }

    # 测试推荐逻辑
    app_test = recommend(user_input)
    print(json.dumps(app_test, indent=2, ensure_ascii=False))
