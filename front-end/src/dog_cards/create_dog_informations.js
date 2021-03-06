async function createDogInformations () {
    const Element = document.querySelector(".dog_card");
    const dog_by_id_response = await getDogInfos();
    console.log(dog_by_id_response);
    
    const Dog = {
        name:   dog_by_id_response.name,
        age:    dog_by_id_response.age,
        gender: dog_by_id_response.gender,
        breed:  dog_by_id_response.breed,
        image:  dog_by_id_response.image_aumigos,
        id:     dog_by_id_response.id_aumigos,
        name_user:  dog_by_id_response.name_user
    }

    
    const dog_img           =       Dog.image != null ? 
                                    `http://localhost:3003/${Dog.image}` :
                                    '../../assets/dog_none_photo.jpg';
    
    let output_to_html = "";
    output_to_html          +=      `<div class="dog_container">` +
                                    `<aside class="dog_image">` +
                                        `<img src="${dog_img}" alt="Imagem do cachorro" class="dog_image_container">` +
                                    `</aside>` +

                                    `<section class="dog_infos">` +
                                        `<h3>
                                        ${Dog.gender.includes("F") ? `A menina ${Dog.name}` : `O menino ${Dog.name}` }
                                        </h3>` + 
                                        `<h4>Raça: ${Dog.breed}</h4>` + 
                                        `<p><strong>
                                        ${Dog.age != 1 ? `Tem ${Dog.age} anos de idade.`: `até ${Dog.age} ano de idade.`}
                                        </strong></p>` + 
                                        `<p>postado por: ${Dog.name_user}</p>` + 
                                    `</section>` +
                            `</div>`;

    Element.innerHTML = output_to_html;

};


async function getDogInfos() {
    const dog_id    = await window.location.href.split("id=")[1];
    const api_url   = await `http://localhost:3003/aumigos/id/${dog_id}`;

    const response = await fetch(api_url, {
        method: 'GET'
    })
    .then(async (res) => {
        res = await res.json();
        return res;
    })
    .catch((err) => { 
        console.log(err);
    });

    return response;
};