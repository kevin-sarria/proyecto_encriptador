/*
    La letra "e" es convertida para "enter"
    La letra "i" es convertida para "imes"
    La letra "a" es convertida para "ai"
    La letra "o" es convertida para "ober"
    La letra "u" es convertida para "ufat"

    styles: {
        'flex-between', 
        'flex-col', 
        'flex-center'
    };

*/

(() => {

    window.addEventListener('DOMContentLoaded', () => {

        const input = document.querySelector('#input-texto');
        const btnEncriptar = document.querySelector('#encriptar');
        const btnDesencriptar = document.querySelector('#desencriptar');
        const translateFather = document.querySelector('.traduccion');
        const translateContainer = document.querySelector('.traduccion__contenedor');


        input.addEventListener( 'input', filtrarPalabras );
        btnEncriptar.addEventListener( 'click', encriptar );
        btnDesencriptar.addEventListener( 'click', desencriptar );

        inicioApp();

        function inicioApp() {

            const imagenInicial = document.createElement('IMG');
            imagenInicial.src = './img/muneco.png';
            imagenInicial.alt = 'Icono muneco';

            const tituloInicial = document.createElement('H2');
            tituloInicial.textContent = 'Ningún mensaje fue encontrado';

            const parrafoInicial = document.createElement('P');
            parrafoInicial.textContent = 'Ingrese el texto que desees encriptar o desencriptar';

            translateFather.classList.add('flex-col', 'flex-center');
            translateContainer.appendChild(imagenInicial);
            translateContainer.appendChild(tituloInicial);
            translateContainer.appendChild(parrafoInicial);


        }

        function encriptar() {
            
            const texto = input.value;
            let palabrasEncriptadas = [];
            let textoFinal = '';
            if(texto.trim().length < 1) return;
            
            Object.values(texto.trim().slice()).forEach( element => {
                switch (element) {
                    case "e":
                        element = "enter";
                        break;
                    case "i":
                        element = "imes";
                        break;
                    case "a":
                        element = "ai";
                        break;
                    case "o":
                        element = "ober";
                        break;
                    case "u":
                        element = "ufat";
                        break;

                    default:
                        break;
                }
                palabrasEncriptadas = [...palabrasEncriptadas, element];
            });

            textoFinal = palabrasEncriptadas.join('');

            const inputRef = document.createElement('INPUT');
            inputRef.value = textoFinal;
            
            const parrafoTexto = document.createElement('P');
            parrafoTexto.textContent = textoFinal;
            parrafoTexto.classList.add('texto-traducido');

            const buttonCopy = document.createElement('BUTTON');
            buttonCopy.textContent = 'Copiar';
            buttonCopy.classList.add('button', 'border-dark-blue', 'hover:bg-gray-light');

            translateFather.classList.remove('flex-col', 'flex-center');

            limpiarHTML();

            translateContainer.classList.add('flex-between');
            translateContainer.appendChild(parrafoTexto);
            translateContainer.appendChild(buttonCopy);

            copiarTexto( buttonCopy, inputRef );
            
        }

        function desencriptar() {

            const texto = input.value;
            let palabrasDesencriptadas = [];
            let textoFinal = '';
            if(texto.trim().length < 1) return;

            // MATCH: Funcion para devolver la palabra, el indice y la frase que se le paso
            // SEARCH: Funcion para devovler el indice de la primera coincidencia de la palabra


            texto.trim().split(' ').map( element => {
                while( element.search("enter") > -1 ) {
                    element = element.replace("enter", "e");
                }
                
                while( element.search("imes") > -1 ) {
                    element = element.replace("imes", "i");
                }
                
                while( element.search("ai") > -1 ) {
                    element = element.replace("ai", "a");
                } 
                
                while( element.search("ober") > -1 ) {
                    element = element.replace("ober", "o");
                }
                
                while( element.search("ufat") > -1 ) {
                    element = element.replace("ufat", "u");
                }
                palabrasDesencriptadas = [ ...palabrasDesencriptadas, element ];
            } );

            textoFinal = palabrasDesencriptadas.join(' ');
            
            const inputRef = document.createElement('INPUT');
            inputRef.value = textoFinal;
            
            const parrafoTexto = document.createElement('P');
            parrafoTexto.textContent = textoFinal;
            parrafoTexto.classList.add('texto-traducido');

            const buttonCopy = document.createElement('BUTTON');
            buttonCopy.textContent = 'Copiar';
            buttonCopy.classList.add('button', 'border-dark-blue', 'hover:bg-gray-light');

            translateFather.classList.remove('flex-col', 'flex-center');

            limpiarHTML();

            translateContainer.classList.add('flex-between');
            translateContainer.appendChild(parrafoTexto);
            translateContainer.appendChild(buttonCopy);

            copiarTexto( buttonCopy, inputRef );

        }
        
        function filtrarPalabras() {

            let texto = input.value;

            // Eliminar caracteres especiales y acentos
            texto = texto.replace(/[^\w\s]/gi, '');
            texto = texto.replace(/[áàäâ]/gi, 'a');
            texto = texto.replace(/[éèëê]/gi, 'e');
            texto = texto.replace(/[íìïî]/gi, 'i');
            texto = texto.replace(/[óòöô]/gi, 'o');
            texto = texto.replace(/[úùüû]/gi, 'u');

            // Convertir a minúsculas
            texto = texto.toLowerCase();

            return input.value = texto;
        }

        function copiarTexto( buttonRef, inputRef = HTMLInputElement ) {
            buttonRef.addEventListener('click', () => {
                translateContainer.appendChild(inputRef);
                inputRef.select();
                document.execCommand('copy');
                translateContainer.removeChild(inputRef);
                
            })
        }

        function limpiarHTML() {
            while( translateContainer.firstChild ) {
                translateContainer.removeChild( translateContainer.firstChild );
            }
        }

    });

})();