<template>
    <div>
        <v-tour name="cupones" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between" style="align-items:center ">
            <div class="col-9 flex">
                <div class="mt-2">
                    <h5>Cupones Ganados 🥳</h5>
                </div>
            </div>
        </div>

        <!-- info encuensta -->
        <div class="row" v-if="cupones.length != 0">
            <!-- crad info cada cupon -->
            <div class="col-md-4 mt-4" v-for="data in cupones" :key="data.id">
                <div class="card" data-v-step="1">
                    <div class="card-header pb-0 px-3" style="text-align:center">
                        <v-icon style="font-size:50px">redeem</v-icon>
                        <h6 class="mb-0">{{ data.nombre_cupon }}</h6>
                        <h6 class="text">{{ data.valor_cupon }}</h6>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group flex_card_question">
                            <!-- todas la sub categorias -->
                            <li class=" list-group-item border-0  border-radius-lg w-100" style="margin: 0 3px">
                                <div class="d-flex flex-column text-center">
                                    <!-- <h6 class="text">{{ data.valor_cupon }}</h6> -->
                                    <span class="mb-2 text-xs">
                                        <span v-if="data.id_state_cg == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">{{
                                                data.stateValCupon }}</span>
                                        <span v-if="data.id_state_cg == 2"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-info">{{
                                                data.stateValCupon }}</span>
                                        <span v-if="data.id_state_cg == 3"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">{{
                                                data.stateValCupon }}</span>
                                    </span>
                                    <span class="mb-2 text-xs">
                                        <span class="text-dark font-weight-bold ms-sm-2">
                                            Vencimineto: {{ data.fecha_limit }}
                                        </span>
                                    </span>
                                </div>
                                <div class="ms-auto text-center ">
                                    <button @click="wiewCupon(data)" class="btn btn-link text-dark px-3 mb-0"><i
                                            class="fas fa-eye text-dark me-2" aria-hidden="true"></i>Ver
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
        <div v-else>
            <div class="card" data-v-step="1">
                <div class="card-header pb-0 px-3" style="text-align:center">
                    <v-icon style="font-size:50px">redeem</v-icon>
                </div>
                <div class="card-body p-3">
                    <ul class="list-group flex_card_question">
                        <!-- todas la sub categorias -->
                        <li class=" list-group-item border-0 mb-2 border-radius-lg w-100" style="margin: 0 3px">
                            <div class="d-flex flex-column text-center">
                                <h5 class="text-sm">No tienes cupones para Reclamar
                                </h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- {{ fechahoy }} -->
        <!-- <pre>{{ cupones }}</pre> -->
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import images from '../../../api/URL_imges';
import Api from '../../../api/API_feedback';


export default {
    name: 'FeedbackIndex',

    data() {
        return {
            fechahoy: new Date(),
            companie: {},
            images: images,
            user: [],
            sucursal: [],
            idSucursal: null,
            cupones: [],
            myOptions: {
                useKeyboardNavigation: true,
                labels: {
                    buttonSkip: 'Terminar',
                    buttonPrevious: 'Atras',
                    buttonNext: 'Siguiente',
                    buttonStop: 'Finalizar'
                }
            },
            steps: [
                {
                    target: '[data-v-step="0"]',  // We're using document.querySelector() under the hood
                    content: `En este icono podras crear todos cupones que quieras ofrecerle al tus encuestados que ingrrsen sus datos en el formulario`,
                },
                {
                    target: '[data-v-step="1"]',
                    content: 'Despues de crear tu cupon aqui se visualizara y se elimiaran de acuerdo a la fecha establecida',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui puedes modificar datos del cupón',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: 'Aqui puedes elimirar el cupónn',
                    params: {
                        // placement: 'top'
                    }
                }
            ]
        };
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        await this.getListcuponesCompanie()
    },

    methods: {
        async getListcuponesCompanie() {
            let id = this.user.idUser
            const data = await this.$axios.$get(`${Api}/cliente_cupones/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.cupones = data;
            // console.log(data.length);
            if (data.length != 0) {
                let arr = data;
                let valcount = 0;
                for (let index = 0; index < arr.length; index++) {
                    valcount++
                    let dateFinal = new Date(arr[index].fecha_limit);
                    dateFinal.setDate(dateFinal.getDate() + 1)
                    let finalnum = dateFinal.getTime();
                    // console.log(valcount);
                    if (this.fechahoy.getTime() >= finalnum && arr[index].id_state_cg === 1) {
                        this.putSockcero(arr[index].cupon_code);
                        // console.log('jjejej');
                    }
                    // if (valcount = index) {
                    //     this.getListcuponesCompanie()
                    // }

                }
            }
        },
        async putSockcero(id) {
            const params = {
                id_state_cg: 3,
            }
            const data = await this.$axios.$put(`${Api}/cupones_ganados/vencido/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);

        },
        wiewCupon(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                // title: `<strong>Cupón <u>#${data.cupon_code}</u></strong>`,
                // icon: 'info',
                html:
                    ` <style>
                  table, th, td {border-collapse: collapse;}

                  th, td {padding: 5px;text-align: left;}

                  .imgCenter {display: block;margin-left: auto;margin-right: auto;width: 100%; border-radius:50%}                  

                  .centerText { text-align: center}
                  .rightText { text-align: right}
                  .boldText {font-weight: bold;}
                  </style> 
        
          <h3 class="centerText boldText">Codigo Cupón #${data.cupon_code}</h3> 
          <table style="width:100%" >
            <tr>
              <th class="">Cliente</th>
              <th class=""></th>
            </tr>
            <tr>
              <td>Nombre</td>
              <td>: ${data.nameCliente}</td>
            </tr>
            <tr>
              <td>Celular</td>
              <td>: ${data.celCliente}</td>
            </tr>                                                          
          </table>   
          <table style="width:100%" >
            <tr>
              <th class="">Cupón</th>
              <th class=""></th>
            </tr>
            <tr>
              <td>Cupón</td>
              <td>: ${data.nombre_cupon}</td>
            </tr>
            <tr>
              <td>Valor</td>
              <td>: ${data.valor_cupon}</td>
            </tr> 
            <tr>
              <td>Vencimiento</td>
              <td>: ${data.fecha_limit}</td>
            </tr>   
            <tr>
              <td>Estado</td>
              <td>: <strong>${data.stateValCupon}</strong></td>
            </tr>                                                           
          </table>   
          <table style="width:100%" >
            <tr>
              <th class="">Encuesta</th>
              <th class=""></th>
            </tr>
            <tr>
              <td>Sucursal</td>
              <td>: ${data.nameSucursal}</td>
            </tr>
            <tr>
              <td>Dirección</td>
              <td>: ${data.sucuAdrress}</td>
            </tr>
            <tr>
            <tr>
              <td>Encuesta</td>
              <td>: ${data.nameForm}</td>
            </tr>                                                          
          </table>`,
                showCancelButton: false,
                confirmButtonText: '<i class="far fa-list-alt me-2"></i>Cerar!',
                cancelButtonText: 'Cerrar',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        },
        iniciar() {
            this.$tours['cupones'].start();
        },
        async deleteCupon(id) {
            const data = await this.$axios.$delete(`${Api}/cupones/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            this.verdata();

        },
    },
};
</script>

<style></style>