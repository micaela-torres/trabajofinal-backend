const formLogin = document.getElementById("formLogin");

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input_email = document.querySelector("#email");
    const input_password = document.querySelector("#pass");

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      const dtoUsuario = {
        email: input_email.value,
        password: input_password.value,
      };
      const { status } = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dtoUsuario),
      });

      if (status === 201) {
        window.location.href = "/products?limit=10&page=1";
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Welcome to Symart`,
          icon: "success",
          background: "#ffdafcd1",
          color: "#000000d1",
          confirmButtonColor: "#701586d1",
        });
      } else {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Authentication Failed`,
          icon: "error",
          background: "#ffdafcd1",
          color: "#000000d1",
          confirmButtonColor: "#701586d1",
        });
      }
    }
  });
}
