document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const desc = btn.nextElementSibling;
      desc.style.display = desc.style.display === "block" ? "none" : "block";
    });
  });
});

  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      const targetUrl = button.getAttribute('data-target');

      // Reset the gif by re-assigning src to replay animation
      const src = img.src;
      img.src = '';
      img.src = src;

      // Delay navigation until gif plays once (~1.5s)
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 1500);
    });
  });
