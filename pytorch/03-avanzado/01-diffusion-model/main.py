import torch
from src.model import SimpleUnet
from src.diffusion import DiffusionScheduler, DDPM

if __name__ == "__main__":
    print("=" * 60)
    print("Diffusion Model (DDPM) - PyTorch")
    print("=" * 60)
    
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    print(f"\nDispositivo: {device}")
    
    print("\n1. Crear modelo:")
    model = SimpleUnet(in_channels=1, out_channels=1, base_channels=64)
    print(f"  Parámetros: {sum(p.numel() for p in model.parameters()):,}")
    
    print("\n2. Crear scheduler:")
    scheduler = DiffusionScheduler(T=500, device=device)
    print(f"  Pasos de difusión: {scheduler.T}")
    
    print("\n3. Crear DDPM:")
    ddpm = DDPM(model, scheduler, device)
    
    print("\n4. Ejemplo de forward diffusion:")
    sample_image = torch.randn(1, 1, 32, 32).to(device)
    t = torch.randint(0, scheduler.T, (1,), device=device).long()
    noisy_image = scheduler.q_sample(sample_image, t)
    print(f"  Imagen original: {sample_image.shape}")
    print(f"  Imagen con ruido (t={t.item()}): {noisy_image.shape}")
    
    print("\n5. Generación (sin entrenamiento):")
    print("  Generando imagen...")
    generated = ddpm.generate((1, 1, 32, 32))
    print(f"  Imagen generada: {generated.shape}")
    
    print("\n" + "=" * 60)
    print("¡Ejercicio completado!")
    print("Nota: Para mejores resultados, entrena el modelo")
    print("=" * 60)