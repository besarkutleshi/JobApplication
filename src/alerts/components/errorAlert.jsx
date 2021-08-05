import Swal from 'sweetalert2'

function ErrorAlert(message,title="Something went wrong"){
    return (
        Swal.fire(
            title,
            message,
            'error'
        )
    )
}

export default ErrorAlert
