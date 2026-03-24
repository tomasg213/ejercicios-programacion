import torch
from src.data import get_dataloader, Vocabulary
from src.model import TextGeneratorLSTM, TextGenerator

TEXTO_EJEMPLO = """
Python es un lenguaje de programación versátil y poderoso.
Fue creado por Guido van Rossum y lançado por primera vez en 1991.
Python supports multiple programming paradigms including procedural,
object-oriented, and functional programming. The language's design
philosophy emphasizes code readability with the use of significant
indentation. Python is widely used in web development, data science,
artificial intelligence, and scientific computing.
""".strip()

if __name__ == "__main__":
    print("=" * 60)
    print("Generación de Texto con LSTM - PyTorch")
    print("=" * 60)
    
    print("\n1. Preparar datos:")
    vocab = Vocabulary(TEXTO_EJEMPLO)
    print(f"  Vocabulario: {vocab.vocab_size} caracteres")
    
    dataloader = get_dataloader(TEXTO_EJEMPLO, seq_length=50, batch_size=32)
    print(f"  Batches: {len(dataloader)}")
    
    print("\n2. Crear modelo:")
    model = TextGeneratorLSTM(vocab.vocab_size, embed_size=128, hidden_size=256, num_layers=2)
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    generator = TextGenerator(model, vocab, device)
    print(model)
    
    print("\n3. Entrenar:")
    losses = generator.train(dataloader, epochs=50)
    print(f"  Pérdida final: {losses[-1]:.4f}")
    
    print("\n4. Generar texto:")
    generated = generator.generate("python is", length=100, temperature=0.8)
    print(f"  Texto generado:\n{generated[:200]}...")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("=" * 60)