export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\@]+$/;
    return (regex.test(email));
}

export const getInitials=(name)=>{
    if (!name) return "";
    const words=name.split(" ");
    let init="";
    for (let i=0;i<Math.min(words.length,2);i++) init+=words[i][0];
    return init.toUpperCase();
}

export const addThousandsSeparator=(num)=>{
    if (num==null || isNaN(num)) return "";
    const [inP, fracP]=num.toString().split(".");
    const formI=inP.replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return fracP? `${formI}.${fracP}` : formI;
};