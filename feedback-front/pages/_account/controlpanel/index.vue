<template>
    <div class="container-fluid">
        <v-tour name="homeTour" :steps="steps" :options="myOptions"></v-tour>

        <div class="d-flex justify-content-between mb-3" style="align-items:center ">
            <div class="col-9 flex">

                <div class="mt-2">
                    <h5>Home</h5>
                </div>
            </div>

            <div class="col-3 text-center">
                <button @click="iniciar" class="d-flex">
                    <v-icon>mouse</v-icon>
                    <h6> ¿Que hago aqui?</h6>
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <!-- card top -->
                <div class="row">
                    <div class="col-xl-12 col-md-12 col-sm-12 mb-xl-0 mb-4">
                        <div class="card" style="height: 100px;">
                            <div class="card-body p-3">
                                <div class="row">
                                    <div class="col-8">
                                        <div class="numbers">
                                            <p class="text-sm mb-0 text-uppercase font-weight-bold">Cupones</p>
                                            <h3 class="font-weight-bolder">
                                                <!-- {{ sucursales.length }} -->5
                                            </h3>
                                            <!-- <p class="mb-0">
                                                <span class="text-success text-sm font-weight-bolder">+2 Activos</span>
                                                <span class="text-danger text-sm font-weight-bolder">-1 Inactivo</span>
                                            </p> -->
                                        </div>
                                    </div>
                                    <div class="col-4 text-end">
                                        <div class="icon icon-shape bg-gradient-danger shadow-primary text-center">
                                            <v-icon style="color: #fff">redeem</v-icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- tabla de registrados -->
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="flex" style="justify-content: space-between;">
                        <div class="card-header pb-0 flex ">
                            <v-text-field v-model="search" append-icon="search" label="Ingresa el Codigo del cupón"
                                single-line hide-details></v-text-field>
                        </div>
                        <div class="mr-2">
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <v-data-table :headers="headers" :items="cupones_ganados" :search="search" :items-per-page="5"
                                class="elevation-1">
                                <template v-slot:items="props">
                                    <td><v-icon>redeem</v-icon></td>
                                    <td>{{ props.item.cupon_code }}</td>
                                    <td>{{ props.item.nombre_cupon }}</td>
                                    <td>{{ props.item.valor_cupon }}</td>
                                    <td>{{ props.item.create_at }}</td>
                                    <td>{{ props.item.fecha_limit }}</td>
                                    <td>
                                        <span v-if="props.item.id_state_cg == 1"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-success">{{
                                                props.item.stateValCupon }}</span>
                                        <span v-if="props.item.id_state_cg == 2"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-info">{{
                                                props.item.stateValCupon }}</span>
                                        <span v-if="props.item.id_state_cg == 3"
                                            class="badge px-3 py-2 my-1 badge-sm bg-gradient-danger">{{
                                                props.item.stateValCupon }}</span>
                                    </td>
                                    <td>

                                        <button @click="wiewCupon(props.item)"><v-icon>visibility</v-icon></button>
                                    </td>
                                </template>
                                <template v-slot:no-data>
                                    <v-alert :value="true" color="errorl" style="color:#000" icon="warning">
                                        No tienes ningun cliente registrado con tu compañia :(
                                    </v-alert>
                                </template>
                            </v-data-table>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
  
<script>
import Api from '../../../api/API_feedback';
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
    name: 'FeedbackAppCpanel',
    data() {
        return {
            panel: 0,
            isHidden: false,
            user: [],

            search: '',
            headers: [
                {
                    text: '',
                    // align: 'start',
                    // sortable: false,
                    value: 'icon',
                },
                { text: 'Codigo', value: 'cupon_code' },
                { text: 'Nombre', value: 'nombre_cupon' },
                { text: 'Valor', value: 'valor_cupon' },
                { text: 'Obtenido', value: 'create_at' },
                { text: 'Vencimiento', value: 'fecha_limit' },
                {
                    text: 'Estado', value: 'id_state_cg', align: 'start',
                    sortable: false,
                },
                { text: 'Options', value: 'options' }
            ],
            cupones_ganados: [],


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
                    content: `Tarjetas de información general`,
                    params: {
                        placement: 'top'
                    }
                },//Regresa a tus cupones <strong>Aqui</strong>! 
                {
                    target: '[data-v-step="1"]',
                    content: `Total comentarios recibidos resumen`,
                    params: {
                        placement: 'right'
                    }
                },
                {
                    target: '[data-v-step="2"]',
                    content: 'Aqui pordras visualizar todas las encuestas creadas',
                    params: {
                        placement: 'top'
                    }
                },
                {
                    target: '[data-v-step="3"]',
                    content: `<strong>Aqui</strong> puedes ir a crear una nueva encuesta`,
                    params: {
                        placement: 'left'
                    }
                },
                {
                    target: '[data-v-step="4"]',
                    content: `<strong>Aqui</strong> podras visualizar graficamente la cantidad de comentarios recibidos`,
                    params: {
                        placement: 'top'
                    }
                }
            ]
        }
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
            this.cupones_ganados = data;
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
        mesaje() {
            console.log('click');
        },
        iniciar() {
            this.$tours['homeTour'].start();
        },


    },
};
</script>
  
<style></style>