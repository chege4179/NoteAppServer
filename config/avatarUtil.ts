function randomHexColor() {
     let hex = '';
     const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
     for(let i = 0; i < 6; i++){
          const index = Math.floor(Math.random() * hexValues.length)
          hex += hexValues[index];
     }

     return hex;
}
function generateAvatarURL(name:string){
     const splitname = name.split(" ").join("+")
     const color = randomHexColor()
     return `https://ui-avatars.com/api/?background=${color}&color=fff&name=${splitname}&bold=true&fontsize=0.6`

}

export default generateAvatarURL
