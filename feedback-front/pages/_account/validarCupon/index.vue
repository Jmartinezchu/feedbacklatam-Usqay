<template>
    <div>
        <div class="flex" style="align-items:center; justify-content: space-between;">
            <div class="mx-2">
                <h5>Cupones Ganados</h5>
            </div>
            <button @click="actualizarData()" style="background-color:#ffca45" class="btn btn-btn">Actualizar...!</button>
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
                                    <td>{{ props.item.create_at }}</td>
                                    <td>{{ props.item.cupon_code }}</td>
                                    <td>{{ props.item.nombre_cupon }}</td>
                                    <td>{{ props.item.valor_cupon }}</td>

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

                                        <button v-if="props.item.id_state_cg != 1"
                                            @click="wiewCupon(props.item)"><v-icon>visibility</v-icon></button>
                                        <button v-if="props.item.id_state_cg === 1"
                                            @click="validarCupon(props.item)"><v-icon>print</v-icon></button>
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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../api/API_feedback';
import JQuery from "jquery";
import images from '../../../api/URL_imges';
let $ = JQuery;
export default {
    name: 'FeedbackAppIndex',

    data() {
        return {
            fechahoy: new Date(),
            dialog: false,
            user: {},
            images: images,
            companie: {},
            search: '',
            headers: [
                {
                    sortable: false,
                    text: '',
                    value: 'icon',
                },
                { sortable: false, text: 'Obtenido', value: 'create_at' },
                { sortable: false, text: 'Codigo', value: 'cupon_code' },
                { sortable: false, text: 'Nombre', value: 'nombre_cupon' },
                { sortable: false, text: 'Valor', value: 'valor_cupon' },
                { sortable: false, text: 'Vencimiento', value: 'fecha_limit' },
                { sortable: false, text: 'Estado', value: 'id_state_cg' },
                { sortable: false, text: 'Options', value: 'options' }
            ],
            cupones_ganados: [],
            datacompanie: {}
        }
    },

    async mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.companie = JSON.parse(localStorage.getItem("companie"))

        this.datacompanie = JSON.parse(localStorage.getItem("datacompanie"))
        this.cupones_ganados = this.datacompanie.lists.cupones_ganados
        // await this.getListcuponesCompanie();
        // await this.getDataCompanie()
    },

    methods: {

        async actualizarData() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/home/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            localStorage.setItem("datacompanie", JSON.stringify(data));
            Swal.fire({
                icon: 'success',
                title: 'Actualizando...!',
                text: 'procesando...',
                timer: 1500,
                confirmButtonColor: '#ff0000',
                showConfirmButton: false,
            })
        },
        // async getDataCompanie() {
        //     let id = this.user.idCompanie
        //     const data = await this.$axios.$get(`${Api}/companies/` + id).catch(error => {
        //         console.log('Request canceled', error)
        //     })
        //     this.companie = data[0]
        //     // console.log(data[0]);
        // },
        async getListcuponesCompanie() {
            let id = this.user.idCompanie
            const data = await this.$axios.$get(`${Api}/cupones_ganados/${id}`).catch(error => {
                console.log('Request canceled', error)
            })
            this.cupones_ganados = data;
            // console.log(this.cupones_ganados);
            if (data.length != 0) {
                let arr = data;
                let valcount = 0;
                for (let index = 0; index < arr.length; index++) {
                    valcount++
                    let dateFinal = new Date(arr[index].fecha_limit);
                    dateFinal.setDate(dateFinal.getDate() + 2)
                    let finalnum = dateFinal.getTime();
                    // console.log(valcount);
                    if (this.fechahoy.getTime() >= finalnum && arr[index].id_state_cg === 1) {
                        this.putSockcero(arr[index].cupon_code);
                    }
                    if (valcount === index) {
                        await this.getListcuponesCompanie()
                    }

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
        mesaje() {
            console.log('click');
        },
        async putStateCupon(objt) {
            const params = {
                id_state_cg: 2,
                fecha_reclamado: new Date()
            }
            const data = await this.$axios.$put(`${Api}/cupones_ganados/state/${objt.cupon_code}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);
            if (data.message === 'update') {
                // console.log('se imprime');
                this.ImprimirOrden(objt)
            }
            await this.getListcuponesCompanie();
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
                    <div class="card">
                <div class="card-header pb-0 px-3" style="text-align:center">
                    <img width="100" style="border-radius: 50%;" src='${images}/${this.companie.filename}' alt="">
                </div>
            </div>
          <h3 class="centerText boldText">Detalle Cupón #${data.cupon_code}</h3> 
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
              <td>:<strong>${data.stateValCupon}</strong></td>
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
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-list-alt me-2"></i>Imprimir!',
                cancelButtonText: 'Cerrar',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.ImprimirOrden(data)
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        },
        validarCupon(data) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn mx-1 btn-success',
                    cancelButton: 'btn mx-1 btn-danger'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: `Solicita el DNI y verifica la identidad de ${data.nameCliente}`,
                text: `El cupon pasara de "Por Reclamar" a "Reclamado"`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: '<i class="far fa-list-alt me-2"></i> Verificado!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.putStateCupon(data)
                    swalWithBootstrapButtons.fire(
                        {
                            title: 'Listo!',
                            text: 'Imprimirndo',
                            icon: 'success',
                            timer: 1000,
                        }
                    )
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    // console.log('no se elimina')
                }
            })
        },
        ImprimirOrden(data) {
            $("<iframe>", { name: "myiframe", class: "printFrame" })
                .appendTo("body")
                .contents()
                .find("body").append(`
                <style>
                  table, th, td {border-collapse: collapse;}

                  th, td {padding: 5px;text-align: left;}

                  .imgCenter {display: block;margin-left: auto;margin-right: auto;width: 100%; border-radius:50%}                  

                  .centerText { text-align: center}
                  .rightText { text-align: right}
                  .boldText {font-weight: bold;}
                  </style>  
                
            <div class="card">
                <div class="card-header pb-0 px-3" style="text-align:center">
                    <img width="100" style="border-radius: 50%;" src='${images}/${this.companie.filename}' alt="">
                </div>
            </div>
          <h3 class="centerText boldText">Detalle Cupón #${data.cupon_code}</h3> 
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
          </table>       
          <h2 class="centerText boldText">#${data.cupon_code}</h2> 
          <h2 class="centerText boldText">FeedbackLatam.com</h2> 
        `);

            window.frames["myiframe"].focus();
            window.frames["myiframe"].print();
            // console.log(window.frames["myiframe"].print(), window.frames["myiframe"].focus());
            setTimeout(() => {

                $(".printFrame").remove();
            }, 1000);
        },
        verConsola() {
            console.log('se imprimio');
        }

    },
};
</script>

<style scoped></style>
