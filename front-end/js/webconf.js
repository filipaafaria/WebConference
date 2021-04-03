window.onload = function() {
    // código para manipulação do DOM
    const btnRegister = document.getElementById("btnRegister")
    
    btnRegister.addEventListener("click", function() {
        swal({
            title: "Inscrição na WebConference",
            html:
            '<input id="swal-input1" class="swal2-input" placeholder="nome">' +
            '<input id="swal-input2" class="swal2-input" placeholder="e-mail">',
            showCancelButton: true,
            confirmButtonText: "Inscrever",
            cancelButtonText: "Cancelar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const name = document.getElementById('swal-input1').value
                const email = document.getElementById('swal-input2').value
                return fetch(`${urlBase}/conferences/1/participants/${email}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    body: `nomeparticipant=${name}`
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText);
                        }
                        return response.json();
                    })
                    .catch(error => {
                        swal.showValidationError(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then(result => {
            if (result.value) {               
                if (!result.value.err_code) {
                  swal({title: "Inscrição feita com sucesso!"})  
                } else {
                  swal({title: `${result.value.err_message}`})  
                }
            }
        });
    });
}