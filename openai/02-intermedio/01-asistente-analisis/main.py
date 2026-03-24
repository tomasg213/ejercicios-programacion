from src.asistente import FunctionCaller, Tool, analyze_sales, calculate_growth

if __name__ == "__main__":
    print("=" * 60)
    print("Asistente de Análisis con Function Calling - OpenAI")
    print("=" * 60)
    
    assistant = FunctionCaller()
    assistant.add_tool(Tool("analyze_sales", "Analiza datos de ventas", analyze_sales))
    assistant.add_tool(Tool("calculate_growth", "Calcula crecimiento entre valores", calculate_growth))
    
    print("\n1. Análisis de ventas:")
    sales_data = [
        {"mes": "Enero", "ventas": 10000},
        {"mes": "Febrero", "ventas": 12000},
        {"mes": "Marzo", "ventas": 15000}
    ]
    result = analyze_sales(sales_data)
    print(f"  Resultado: {result}")
    
    print("\n2. Cálculo de crecimiento:")
    growth = calculate_growth(15000, 10000)
    print(f"  Resultado: {growth}")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)