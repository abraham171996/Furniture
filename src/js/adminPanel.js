const base_url = "http://localhost:3001"
///POST REQUEST RANGE

const save_range = document.querySelector("#save_range");
const room_name = document.querySelector("#room-name");
const room_image = document.querySelector("#room-image");

save_range && 
save_range.addEventListener("click",(e) => {
    e.preventDefault();

    if(
        !room_image.value ||
        !room_name.value
    ){
        return swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all the  fileds",
          });
    }
    const postdata = {
        id:self.crypto.randomUUID(),
        name:room_name.value,
        image:room_image.value
    };
    axios.post(`${base_url}/range`,postdata)
    .then((res)=>{
        if(res.status === 201) {
            swal.fire({
                icon: "Success",
                title: "Success",
                text: "Product add successfully",
              });
        }
    })
    
})

///GET REQUEST RANGE
const getRange = document.querySelector(".range-body");

axios.get(`${base_url}/range`)
  .then((res) => {
    const sortedRangeData = res.data.sort((a, b) => b.id.localeCompare(a.id));
    const maxItemsToShow = 3; // Set the maximum number of items to display

    // Slice the array to get the first three items (latest items)
    const latestRangeData = sortedRangeData.slice(0, maxItemsToShow);
    res.data.map((range) => {
        
      getRange.innerHTML += `
        <tr style="height:150px"  data-key=${range.id} >
          <td style="height:150px" ><img src=${range.image} 
            style="width: 150px; height: 150px; object-fit: cover;"
            alt=""
          ></td>
          <td style="height:150px ; padding-top:75px; "  >${range.name}</td>
          <td style="height:200px" class="d-flex align-items-center justify-content-end">
            <button type="button" class="btn btn-danger delete-range" data-range-id="${range.id}">Delete</button>
          </td>
        </tr>
      `;
    });

    const deleteRangeButtons = document.querySelectorAll(".delete-range");
    deleteRangeButtons.forEach((deleteButton) => {
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        const rangeId = e.target.getAttribute("data-range-id");
        axios.delete(`${base_url}/range/${rangeId}`)
          .then((response) => {
            if (response.status === 200) {
              swal.fire({
                icon: "success",
                title: "Success",
                text: "Delete product has been added!",
              });
            }
          })
    
      });
    });
  });


///POST REQUEST WORKS
const save_works = document.querySelector("#save-works");
const works_name = document.querySelector("#works-name");
const works_image = document.querySelector("#works-image");
const works_description = document.querySelector("#works-description");

save_works &&
save_works.addEventListener("click", (e) => {
    e.preventDefault();
    if (!works_image.value || !works_name.value || !works_description.value) {
        return swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all the fields",
        });
    }

    const postdata = {
        id: crypto.randomUUID(),
        name: works_name.value,
        image: works_image.value,
        description: works_description.value,
    };

    axios.post(`${base_url}/works`, postdata)
    .then((res) => {
        if (res.status === 201) {
            swal.fire({
                icon: "success",
                title: "Success",
                text: "Product added successfully",
            });
        } else {
            throw new Error("Failed to add product");
        }
    })
    .catch((err) => {
        swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
        });
    });
});

///GET REQUEST WORKS
const getWorks = document.querySelector(".works-body");

axios.get(`${base_url}/works`)
.then((res)=>{
    res.data.map((work) => {
        getWorks.innerHTML += `
        <tr style="height:150px" data-key="${work.id}">
            <td style="height:150px"><img src="${work.image}" style="width: 150px; height: 150px; object-fit: cover;" alt=""></td>
            <td style="height:150px; padding-top:75px;">${work.name}</td>
            <td style="height:150px; padding-top:75px;">${work.description}</td>
            <td style="height:200px" class="d-flex align-items-center justify-content-end">
                <button type="button" class="btn btn-danger delete-work" data-work-id="${work.id}">Delete</button>
            </td>
        </tr>
        `;
    });

    const deleteButtons = document.querySelectorAll(".delete-work");
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (e) => {
            e.preventDefault();
            const workId = deleteButton.getAttribute("data-work-id");
            axios.delete(`${base_url}/works/${workId}`)
            .then((response) => {
                if (response.status === 200) {
                    swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Delete product has been added!",
                    });
                }
            })
          
        });
    });
});