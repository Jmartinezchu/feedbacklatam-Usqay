<template>
    <div class="container_index">
        <div class="card_todo_question">
            <topPage></topPage>
            <div class="btnPrimary" style="display:flex; flex-direction:column">
                <p style="text-align:center; margin-bottom:-10px">click aqui para conocer tu premio</p>
                <button v-if="Enviar != 1" @click="ActiveSendCupon()" type="button" style="float:left;"
                    id="spin">Promoción</button>
            </div>
            <canvas id="canvas" width="500" height="500"></canvas>
            <!-- <Ruleta /> -->
            <div class="btnPrimary" style="display:flex;">
                <!-- <button type="button" style="float:left;" id='btnspin'>Girar</button> -->
                <nuxt-link
                    :to="`/forms/${this.route.idQr}/${route.idCompanie}/${route.idSucursal}/${route.idForm}/pageEnd`"><button
                        class="omitir">Omitir</button></nuxt-link>
                <!-- <nuxt-link to="/pageRuleta"><button>Enviar</button></nuxt-link> -->
                <button v-if="Enviar != 0" @click="mensaje()">Enviar</button>
            </div>
            <!-- <pre>{{ cuponganado }}</pre> -->
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../../../../../../../api/API_feedback';
// import "./../static/js/ruleta.js"
export default {
    name: 'FeedbackAppPageRuleta',
    layout: 'clientes',
    head: {
        script: [
            { type: 'text/javascript', src: '/js/ruleta.js' }
        ]
    },
    data() {
        return {
            Enviar: 0,
            route: {},
            cuponganado: [],
            id_cuponganado: null,
            putStock: null
        }
    },

    mounted() {
        this.route = this.$route.params
        // console.log(this.route);
        // history.forward()

    },
    created() {
    },
    methods: {
        async addCuponGanado() {
            const params = {
                id_companie: this.route.idCompanie,
                id_sucursal: this.route.idSucursal,
                id_form: this.route.idForm,
                id_client: this.route.idCliente,
                id_cupon: this.cuponganado.id,
                nombre_cupon: this.cuponganado.nombre,
                valor_cupon: this.cuponganado.valor,
                fecha_limit: this.cuponganado.final,
                cupon_code: `${this.route.idCompanie}${this.route.idSucursal}${this.route.idCliente}${this.cuponganado.id}`
            }
            const data = await this.$axios.$post(`${Api}/cupones_ganados`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(data);

            if (data.message == 'El cupon se registro correctamente') {
                let idCuponInsert = data.deploy.insertId
                // console.log(idCuponInsert, params.cupon_code);
                await this.putCodeCupon(idCuponInsert, params.cupon_code);
                this.id_cuponganado = this.cuponganado.id;
                this.putStock = this.cuponganado.stock - 1;
                await this.putStockCupon(this.id_cuponganado, this.putStock);
                Swal.fire({
                    icon: "success",
                    title: "Felicidades",
                    text: "Ingresa a FeedbackLatam.com con tu correo y número de telefono y reclama tu premio",
                    // timer: 3500,
                    buttons: false,
                    customClass: {
                        confirmButton: 'btn mx-1 btn-danger',
                        cancelButton: 'btn mx-1 btn-danger'
                    },
                }).then(() => {
                    // Aquí la alerta se ha cerrado
                    localStorage.removeItem('identificadores');
                    localStorage.removeItem('typeEval');
                    localStorage.removeItem('cuponganado');
                    localStorage.removeItem('typeComents');

                    location.href = `/forms/${this.route.idQr}/${this.route.idCompanie}/${this.route.idSucursal}/${this.route.idForm}/pageEnd`

                });

            } else {
                // console.log('Error muy grave');
            }
        },
        async putCodeCupon(id, cont) {
            const params = {
                cupon_code: `${id}${cont}`
            }
            const data = await this.$axios.$put(`${Api}/cupones_ganados/code_cupon/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
            // console.log(params);
        },
        async putStockCupon(id, val) {
            const params = {
                stock: val
            }
            const data = await this.$axios.$put(`${Api}/cupones/stock/${id}`, params).catch(error => {
                console.log('Request canceled', error)
            })
        },
        ActiveSendCupon() {
            this.Enviar = 1
        },
        async mensaje() {
            this.cuponganado = JSON.parse(localStorage.getItem("cuponganado"))
            await this.addCuponGanado();
        }
    }
}
</script>

<style>
.omitir {
    background-color: royalblue;
}

@media screen and (max-width:700px) {
    .btnPrimary {
        flex-direction: column !important;
    }
}

canvas {
    /* margin-top: 10px; */
    position: relative;
    min-width: 300px !important;
    /* width: 500px; */
    max-width: 500px !important;
    z-index: 1;
}

@media screen and (max-width:600px) {
    canvas {
        width: 310px !important;
    }
}
</style>