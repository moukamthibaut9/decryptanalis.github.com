/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>      VARIABLES DE LA ZONE DE CHIFFREMENT     <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

// Cette variable definit le boutton qui déchiffre le texte non clair lorsqu'on clique dessus 
var crypt_btn=document.getElementsByClassName("crypt_btn");
// Cette variable stoque le texte clair
var decrypted_text=document.getElementsByClassName("decrypted_text");
// Cette variable stoque la clé de chiffrement
var crypt_key=document.getElementsByClassName("crypt_key");
// Bloc correspondant a chaque methode de chiffrement
var crypt_father_bloc=document.getElementsByClassName("crypt_father_bloc");


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

// Tableau qui va stoquer les lettres de l'alphabet
var main_characters=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
// Tableau qui va stoquer d'autres caracteres que l'on pourrait accepter hors mis les lettres de l'alphabet
var other_characters=[" ",",",":",".",";","!","?","'",'"',"-"]
// Tous les symboles ne figurant pas dans l'un des tableaux precedents ne seront pas pris en charge


for(let i=0;i<crypt_btn.length;i++){ 
    // Cette variable stoque le champ 'input' qui est créé pour l'affichage des resultats
    var input_text_out=document.createElement("input");
    crypt_btn[i].onclick=function(){
        // Cette variable stoque le texte sous sa forme cryptée
        let text_out="";
        // Cette variable passe a 'false' lorsqu'il y'a un caractere invalide dans la sequence du texte clair
        let valid_char=true;
        // Pour les methodes de chiffrement par bloc, cette variable represente un 'index'
        // pour parcourir la cle caractere par caractere
        let key_char_index=0;
        // Pour les methodes de chiffrement par bloc, cette variable represente un 'index'
        // pour parcourir le texte clair bloc par bloc
        let text_part_index=0;
        // Cette variable copie le contenu du texte clair
        let copy_decrypted_text=""
        // Cette variable autorise ou non l'ajout de caracteres au texte clair s'il s'agit d'un chiffrement par transposition
        let concatenate=true
        // Stoque le nombre de caracteres qui seront ajoutés au texte clair actuel dans le cas de la transposition
        let nbr_added_chars=0
        // Cette premiere boucle parcours le texte clair caractere par caractere
        for(let k=0;k<decrypted_text[i].value.length;k++){
            valid_char=false;
            if(i==2 || i==3)
                key_char_index=key_char_index%(crypt_key[i].value.length);
            if (i==3 && k>0 && k%crypt_key[i].value.length==0)
                text_part_index+=1
            // Cette deuxieme boucle parcours l'alphabet pour detecter si le caractere actuel
            // du texte clair s'y trouve
            for(let j=0;j<main_characters.length;j++){
                // Intrustions pour un chiffrement par decalage (Click sur le premier button)
                if (i==0 && decrypted_text[i].value[k].toLowerCase()===main_characters[j]){
                    text_out+=main_characters[(j+parseInt(crypt_key[i].value))%26];
                    valid_char=true;
                    break;
                }
                // Intrustions pour un chiffrement par substitution (Click sur le button 2)
                else if (i==1 && decrypted_text[i].value[k].toLowerCase()===main_characters[j]){
                    text_out+=crypt_key[i].value[j];
                    valid_char=true;
                    break;
                }
                // Intrustions pour un chiffrement de Vigenere (Click sur le button 3)
                else if (i==2 && decrypted_text[i].value[k].toLowerCase()===main_characters[j]){
                    for(let j1=0;j1<main_characters.length;j1++){
                        if (crypt_key[i].value[key_char_index].toLowerCase()===main_characters[j1]){
                            text_out+=main_characters[(j+j1)%26];
                            break;
                        }
                    }
                    valid_char=true;
                    break;
                }
            }
            // Cette boucle parcours d'autres caracteres pour detecter si le caractere actuel
            // du texte clair s'y trouve
            for(let m=0;m<other_characters.length;m++){
                if(decrypted_text[i].value[k]===other_characters[m]) {
                    if (i==3){
                        nbr_added_chars=crypt_key[i].value.length-decrypted_text[i].value.length%crypt_key[i].value.length;
                        if (concatenate){
                            for(j1=0;j1<nbr_added_chars;j1++)
                                decrypted_text[i].value+='w';
                            concatenate=false;
                        }
                        copy_decrypted_text=decrypted_text[i].value;
                        text_out+=copy_decrypted_text[text_part_index*(crypt_key[i].value.length)+parseInt(crypt_key[i].value[key_char_index])];
                    }
                    else
                        text_out+=decrypted_text[i].value[k];
                    valid_char=true;
                    break;
                }
            }
            key_char_index+=1
            // Si un caractere dans le texte clair ne figure ni dans l'alphabet, ni dans le tableau
            // 'other_caracters', il est considéré comme invalide; on affiche alors un message d'erreur
            if(valid_char==false){
                alert("Votre texte contient un caractere non pris en charge");
                break;
            }
        }
        // Si tout se passe bien avec tous les caracteres du texte clair, on affiche le texte chiffré
        // dans le champ 'input' créé précédemment
        if (valid_char==true) {
            input_text_out.type="text";
            input_text_out.style.width = "90%"
            input_text_out.style.borderRadius = "5px"
            crypt_father_bloc[i].appendChild(input_text_out);
            input_text_out.value=text_out;
        }
    }
}