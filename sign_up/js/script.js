

const verifyPassword = () =>{
    const password = document.getElementById("inputPassword");
    const confirmPassword = document.getElementById('inputConfirmPassword');
    const errorMsg = document.getElementById('errorMsg');

    if(password.value !== confirmPassword.value){
        password.style.cssText= 'border: 2px solid red;';
        confirmPassword.style.cssText= 'border: 2px solid red;'
        errorMsg.style.display="block";
        return
    }
    password.style.cssText= '';
    confirmPassword.style.cssText= ''
    errorMsg.style.display="none";

}