/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>      VARIABLES DE LA ZONE DE DECHIFFREMENT     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

// Cette variable definit le boutton qui chiffre le texte clair lorsqu'on clique dessus 
var decrypt_btn=document.getElementsByClassName("decrypt_btn");
// Cette variable stoque le texte non clair
var crypted_text=document.getElementsByClassName("crypted_text");
// Cette variable stoque la clé de déchiffrement
var decrypt_key=document.getElementsByClassName("decrypt_key");
// Bloc correspondant a chaque methode de déchiffrement
var decrypt_father_bloc=document.getElementsByClassName("decrypt_father_bloc");


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

// Tableau qui va stoquer les lettres de l'alphabet
var main_characters=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
// Tableau qui va stoquer d'autres caracteres que l'on pourrait accepter hors mis les lettres de l'alphabet
var other_characters=[" ",",",":",".",";","!","?","'",'"',"-"]
// Tous les symboles ne figurant pas dans l'un des tableaux precedents ne seront pas pris en charge



for(let i=0;i<decrypt_btn.length;i++){ 
    // Cette variable stoque le champ 'input' qui est créé pour l'affichage des resultats
    var input_text_out=document.createElement("input");
    decrypt_btn[i].onclick=function(){
        // Cette variable stoque le texte clair
        let text_out="";
        // Cette variable passe a 'false' lorsqu'il y'a un caractere invalide dans la sequence du texte chiffré
        let valid_char=true;
        // Pour les methodes de chiffrement par bloc, cette variable represente un 'index'
        // pour parcourir la cle caractere par caractere
        let key_char_index=0;
        // Pour les methodes de chiffrement par bloc, cette variable represente un 'index'
        // pour parcourir le texte chiffré bloc par bloc
        let text_part_index=0;
        // Cette premiere boucle parcours le texte crypté caractère par caractère
        for(let k=0;k<crypted_text[i].value.length;k++){
            valid_char=false;
            if(i==2 || i==3)
                key_char_index=key_char_index%(decrypt_key[i].value.length);
            if (i==3 && k>0 && k%decrypt_key[i].value.length==0)
                text_part_index+=1
            // Cette deuxieme boucle parcours l'alphabet pour detecter si le caractere actuel
            // du texte crypté s'y trouve
            for(let j=0;j<main_characters.length;j++){
                // Intrustions pour un déchiffrement par decalage (Click sur le premier button)
                if (i==0 && crypted_text[i].value[k].toLowerCase()===main_characters[j]){
                    if (j-parseInt(decrypt_key[i].value)>=0)
                        text_out+=main_characters[(j-parseInt(decrypt_key[i].value))];
                    else
                        text_out+=main_characters[26+(j-parseInt(decrypt_key[i].value))];
                    valid_char=true;
                    break;
                }
                // Intrustions pour un déchiffrement par substitution (Click sur le button 2)
                else if (i==1 && crypted_text[i].value[k].toLowerCase()===decrypt_key[i].value[j].toLowerCase()){
                    text_out+=main_characters[j];
                    valid_char=true;
                    break;
                }
                // Intrustions pour un déchiffrement de Vigenere (Click sur le button 3)
                else if (i==2 && crypted_text[i].value[k].toLowerCase()===main_characters[j]){
                    for(let j1=0;j1<main_characters.length;j1++){
                        if (decrypt_key[i].value[key_char_index].toLowerCase()===main_characters[j1]){
                            if (j-j1>=0)
                                text_out+=main_characters[(j-j1)];
                            else
                                text_out+=main_characters[26+(j-j1)];
                            break;
                        }
                    }
                    valid_char=true;
                    break;
                }
            }
            // Cette boucle parcours d'autres caracteres pour detecter si le caractere actuel
            // du texte chiffré s'y trouve
            for(let m=0;m<other_characters.length;m++){
                if(crypted_text[i].value[k]===other_characters[m]) {
                    if (i==3){
                        for (j1=text_part_index*(decrypt_key[i].value.length);j1<(text_part_index+1)*(decrypt_key[i].value.length);j1++){
                            if (parseInt(decrypt_key[i].value[j1%decrypt_key[i].value.length])==key_char_index && crypted_text[i].value[j1]!='w'){
                                text_out+=crypted_text[i].value[j1];
                                break;
                            }
                        }
                    }
                    else
                        text_out+=crypted_text[i].value[k];
                    valid_char=true;
                    break;
                }
            }
            key_char_index+=1
            // Si un caractere dans le texte chiffré ne figure ni dans l'alphabet, ni dans le tableau
            // 'other_caracters', il est considéré comme invalide; on affiche alors un message d'erreur
            if(valid_char==false){
                alert("Votre texte contient un caractere non pris en charge");
                break;
            }
        }
        // Si tout se passe bien avec tous les caracteres du texte chiffré, on affiche le texte déchiffré
        // dans le champ 'input' créé précédemment
        if (valid_char==true) {
            input_text_out.type="text";
            input_text_out.style.width = "90%"
            input_text_out.style.borderRadius = "5px"
            decrypt_father_bloc[i].appendChild(input_text_out);
            input_text_out.value=text_out;
        }
    }
}