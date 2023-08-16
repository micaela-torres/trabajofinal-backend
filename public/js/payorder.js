async function payOrder(cid) {
  const cidarr = cid.split("carts/");
  const cidt = cidarr[1];
  const FETCH_URL = `http://localhost:8080/api/tickets`;
  await fetch(FETCH_URL, {
    method: "POST",
    body: JSON.stringify({ cart: cidt }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((ticket) => {
      if (!ticket) {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Purchase Failure`,
          icon: "error",
          background: "#ffdafcd1",
          color: "#000000d1",
          confirmButtonColor: "#701586d1",
        });
      }
      location.href = `/ticket/${ticket.code}?cart=${cidt}`;
    });
}
