

const AuthLayout = ({children})=>{
  return (
    <div class="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
       <h1>Expense Tracker</h1>
       {children}
    </div>
  )
}

export default AuthLayout;