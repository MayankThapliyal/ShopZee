window.addEventListener('DOMContentLoaded',async()=>{
    try{
        //const res = await fetch('http://localhost:8080/auth/nextUserId');
		const res = await fetch('/ShopZee/auth/nextUserId');
        const nextId = await res.text();
        document.getElementById('userId').value=nextId;
    } catch(err){
        console.error("Error fetching next User Id", err);
    }
})

const form = document.getElementById('registerForm');

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const uId = document.getElementById('userId').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phonenumber').value.trim();

    try{
        //const response = await fetch('http://localhost:8080/api/user/register',{
			const response = await fetch('/ShopZee/api/user/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({userId:uId,username,password,email,phonenumber: phone})
        });

        const result = await response.text();

        if(result==="Registration successful!"){
            console.log("Registration Done!");
        setTimeout(()=>{
            window.location.href='login.html';
        },1500);
        } else{
            console.log("Registration failed")
        }
    } catch(err){
        console.error(err);
    }
})