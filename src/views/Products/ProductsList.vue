<template class="register-page">
  <v-card class="card">
    <div>
      <HeaderRegisterProducts
      :haveBack="true"
      title="Gerenciamento de produtos"
      text="Relação de produtos, fornecedores e etc."
    />
    </div>
    <v-dialog v-model="dialog" width="690">
      <v-card class="card-dialog">
        <figure class="close-btn">
          <img
            src="/imgs/icons/close-icon.svg"
            alt="Botão fechar"
            @click="openAndCloseDialog"
          />
        </figure>
        <div class="title-card-dialog">
          <span>Incluir coberturas</span>
        </div>
        <div class="bar-archive">
          <label>Arquivo</label>
          <v-file-input
            show-size
            v-model="productWithDocument.uploadDocument"
            :rules="[
              (v) =>
                (v && v.size < 2000000) || 'Tamanho máximo permitido é de 2 MB',
            ]"
            :loading="loading"
            accept=".pdf"
            @change="importDocument()"
            outlined
            prepend-icon=""
            prepend-inner-icon="mdi-tray-arrow-up"
            class="primary-input"
          >
          </v-file-input>
          <div class="button-item">
            <img src="/imgs/icons/download.svg" alt="Ícone" />
          </div>
        </div>
        <div class="actions">
          <!-- <button class="delete" @click="remove(currentProduct.uploadDocument)">
            <span>Deletar</span>
          </button> -->
          <button class="download">
            <span>Enviar</span>
          </button>
        </div>
      </v-card>
    </v-dialog>
    <div class="title-card">
      <span>
        Consulta de Produtos para Venda de Banco de dias cadastrados
      </span>
    </div>
    
    <div class="table-content">
      <v-data-table
        :loading="loading"
        loading-text="Carregando..."
        no-data-text="Nenhum produto encontrado"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
        hide-default-footer
        @update="products"
      >
        <!-- <template v-slot:item.name="{ item }">
          {{ item.name != null ? item.name : "Sem registro" }}
        </template>

        <template v-slot:[`item.coverages`]="{ item }">
          {{ getCoverageAssistence(item) }}
        </template>

        <template v-slot:[`item.coveregaBaggage`]="{ item }">
          {{ getCoverageBaggage(item) }}
        </template>
        <template v-slot:item.payment="{ item }">
          {{ item.payment == 0 ? "BOLETO" : "CARTÃO DE CRÉDITO" }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status == true ? "ATIVADO" : "DESATIVADO" }}
          </v-chip>
        </template> -->

        <template v-slot:[`item.ope`]="{ item }" class="slot-btns">
          <div class="slot-btns">
            <div class="btn" @click="openAndCloseDialog(item)">
              <img class="btn-icon" src="/imgs/icons/gift-icon.svg" />
            </div>
            <div class="btn" @click="doSomething(item)">
              <img class="btn-icon" src="/imgs/icons/gift-icon.svg" />
            </div>
            <div class="btn" @click="doSomething(item)">
              <img class="btn-icon" src="/imgs/icons/reload-icon.svg" />
            </div>
            <a class="btn" :href="`/editar-produto/${item.id}`" target="_blank">
              <img class="btn-icon" src="/imgs/icons/edit-icon.svg" />
            </a>
            <button class="btn-active" @click="changeStatus(item)">
              <span v-if="item.status == 0"> Ativar </span>
              <span v-if="item.status == 1"> Desativar </span>
            </button>
          </div>
        </template>

        <!-- <template v-slot:[`item.status`]="{ item }" class="status">
          <div>
            <span
              :class="{
                activeClass: activeStatus(item.status),
                desactiveClass: !activeStatus(item.status),
              }"
              >{{ item.status }}</span
            >
          </div>
        </template> -->
      </v-data-table>
    </div>

    <div class="operations-table">
      <div class="menu">
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="" class="clear-button">
              QTD: {{ pageSize }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(size, i) in sizes"
              :key="i"
              @click="(pageSize = size), getInfos()"
            >
              <v-list-item-title>{{ size }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="" class="clear-button">
              QTD CADASTRADA: {{ pageSize }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(size, i) in sizes"
              :key="i"
              @click="(pageSize = size), getInfos()"
            >
              <v-list-item-title>{{ size }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="pagination-wrapper">
        <v-pagination
          v-model="pager.currentPage"
          :length="pager.totalPages"
          :total-visible="7"
          color="blue"
        ></v-pagination>
      </div>

      <div class="empty"></div>
    </div>
  </v-card>
</template>

<script>
import HeaderRegisterProducts from "./HeaderRegisterProducts.vue"
export default {
  components:{
HeaderRegisterProducts
  },
  data() {
    return {
      dialog: false,
      loading: false,
      productWithDocument: {},
      products: [
        {
          name: "alguma coisa",
        },
      ],
      pager: {},
      pageSize: 10,
      sizes: [10, 20, 30, 50],
      headers: [
        {
          text: "Nome do produto",
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Formas de Pagamento",
          value: "payment",
          align: "start",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          align: "start",
          sortable: false,
        },
        { text: "Operações", value: "ope", align: "start", sortable: false },
      ],
      desserts: [],
    };
  },
  created() {},
  methods: {
    openAndCloseDialog(product) {
      this.dialog == true ? (this.dialog = false) : (this.dialog = true);

      this.productWithDocument = product;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/sass/breakpoints.scss";
@import "@/styles/sass/colors.scss";

.register-page {
  .content {
    padding: 0 0.6rem;
    .item {
      margin: 0 0 1.5rem;
    }
  }
}

.title {
  margin: 0 0 1rem;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 0.95em;
    line-height: 21px;
    color: $black-2;
  }
}
.card-dialog {
  padding: 2rem;
  position: relative;
  .close-btn {
    position: absolute;
    right: 20px;
    top: 15px;

    img {
      width: 18px;
      cursor: pointer;
    }
  }

  & > div,
  figure {
    margin: 1rem 0;
  }
  .title-card-dialog {
    span {
      font-weight: 500;
      font-size: 1.2em;
      line-height: 36px;
      text-align: right;
      letter-spacing: 0.02em;
      color: $black-2;
    }
  }
  .bar-archive {
    position: relative;

    label {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      font-weight: 600;
      font-size: 0.9em;
      line-height: 19px;
      color: $black-2;
      // border: 1px solid grey;
      border-radius: 5px;
      height: 56px;

      .primary-input {
        // display: none;
        // z-index: -1;
        max-width: 91%;
        border: none !important;
      }
      .button-item {
        position: absolute;
        right: 0;
        top: 0;
        height: 56px;
        width: 60px;
        border-radius: 0px 5px 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: $blue-6;
        z-index: 9999;

      }

      @media (max-width:$window-648){
        .primary-input{
          width: 100%;
        }
        .button-item{
          display: none;
        }
      }
    }

    // label {
    //   display: flex;
    //   align-items: center;
    //   gap: 0.5rem;
    //   flex-wrap: wrap;
    //   font-weight: 600;
    //   font-size: 0.9em;
    //   line-height: 19px;
    //   color: $black-2;

    //   .input {
    //     flex: 1 1 auto;
    //     position: relative;
    //     height: 50px;
    //     border: 1px solid $grey-7;
    //     border-radius: 10px;
    //     overflow: hidden;
    //     .button-dowload {
    //       background: $blue-6;
    //       position: absolute;
    //       top: 0;
    //       right: 0;
    //       bottom: 0;
    //       width: 60px;
    //       display: flex;
    //       align-items: center;
    //       justify-content: center;
    //       cursor: pointer;
    //     }

    //     input {
    //       height: 100%;
    //       width: 100%;
    //       padding: 0 1rem;

    //       &:focus {
    //         outline: none;
    //       }
    //       &::placeholder {
    //         font-weight: 400;
    //       }
    //     }
    //   }
    // }

    // .button-item {
    //   position: absolute;
    //   right: 0;
    //   top: 19px;
    //   height: 56px;
    //   width: 60px;
    //   border-radius: 0px 5px 5px 0;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   background: $blue-6;
    // }
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin: 2rem 0 0;
    button {
      padding: 0.7rem;
      width: 150px;
      border-radius: 6px;
    }

    .delete {
      background: $blue-6;
      span {
        color: white;
        font-weight: 500;
      }
    }
    .download {
      border: 1px solid $blue-6;
      span {
        color: $blue-6;
        font-weight: 500;
      }
    }
  }
}
.card {
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0px 7px 20px rgba(96, 151, 168, 0.1) !important;
  overflow: hidden;

  .title-card {
    padding: 2rem;
    span {
      font-weight: 500;
      font-size: 0.95em;
      line-height: 21px;
      color: $black-2;
    }
  }

  & > section {
    margin: 0 0 2.5rem;
  }
  .data-main-plan {
    .form-content {
      margin: 1.5rem 0;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1rem;

      .left {
        display: flex;
        flex-direction: column;
      }
      & > div {
        flex: 1 1 500px;

        & > div {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 0.5rem;

          .description {
            flex: 0 0 120px;

            label {
              font-weight: 600;
              font-size: 12px;
              line-height: 14px;
              color: $black-2;
            }
          }
          .item {
            flex: 1 1 300px;
          }
        }
      }
    }
  }
  .destination-and-coverage {
    margin: 0;
    .desctiptions {
      margin: 1.5rem 0;
      span {
        display: block;
      }
      .title-desc {
        font-weight: 700;
        font-size: 0.95em;
        line-height: 19px;
        letter-spacing: 0.15px;
        color: $black-2;
      }
      .sub-title {
        font-weight: 400;
        font-size: 0.85em;
        line-height: 25px;
        color: $grey-9;
      }
    }
    .checkbox-area {
      margin: 0.5rem 0;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      padding: 0.8rem 0;
      position: relative;
      z-index: 10;

      &::after {
        content: "";
        position: absolute;
        height: 100%;
        top: 0;
        left: -40px;
        right: -40px;
        background: $yellow-1;
        z-index: -1;
      }

      .container {
        flex: 1 1 130px;
      }
    }
    .select-area {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.7rem;
      padding: 0.8rem 0;
      position: relative;
      z-index: 10;
      margin: 0 0 1.5rem;

      &::after {
        content: "";
        position: absolute;
        height: 100%;
        top: 0;
        left: -40px;
        right: -40px;
        background: $yellow-1;
        z-index: -1;
      }
      & > div {
        flex: 1 1 150px;

        .title-select {
          //   text-align: center;
          margin: 0 0 1rem;
          span {
            font-weight: 500;
            font-size: 0.9em;
            line-height: 124.4%;
            color: $black-2;
          }
        }
        .inputs {
          & > div {
            display: flex;
            gap: 0.4rem;

            .description {
              // width: 99px;
            }
            .item {
              flex: 1 1 auto;
            }

            label {
              font-weight: 600;
              font-size: 0.8em;
              line-height: 14px;
              color: $black-2;
            }
          }
        }
      }
    }
  }
  .payment {
    .desctiptions {
      span {
        display: block;
      }
      .title-desc {
        font-weight: 700;
        font-size: 0.95em;
        line-height: 19px;
        letter-spacing: 0.15px;
        color: $black-2;
      }
      .sub-title {
        font-weight: 400;
        font-size: 0.85em;
        line-height: 25px;
        color: $grey-9;
      }
    }
    .payment-type {
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0.8rem 0;
      position: relative;
      z-index: 10;

      &::after {
        content: "";
        position: absolute;
        height: 100%;
        left: -40px;
        right: -40px;
        background: $yellow-1;
        z-index: -1;
      }
      .container {
        width: 190px;
        margin: 0 !important;
      }
    }

    .inputs-payment {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1.5rem;
      & > div {
        flex: 1 1 500px;
      }

      .left {
        .cambio {
          .block-1 {
            display: flex;
            gap: 0.8rem;

            .description {
              flex: 0 0 120px;

              label {
                font-weight: 600;
                font-size: 12px;
                line-height: 14px;
                color: $black-2;
              }
            }
            .input {
              flex: 1 1 auto;
            }
          }
          .block-2 {
            .system-type {
              display: flex;
              align-items: flex-start;
              flex-wrap: wrap;
              gap: 0.5rem;
              .container {
                flex: 1 1 200px;
              }
            }
          }
        }
      }
      .right {
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 1rem;

        & > div {
          flex: 1 1 200px;

          & > div {
            display: flex;
            align-items: flex-start;
            padding: 1rem;
            gap: 0.2rem;

            .description {
              width: 90px;

              label {
                font-weight: 600;
                font-size: 0.6em;
                color: $black-2;
              }
            }
            .item {
              flex: 1 1 auto;
            }
          }
        }
      }
    }
  }

  .observing {
    .title {
      margin: 0 0 1.5rem 0;
    }
    .content-observing {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;

      & > div {
        flex: 1 1 400px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;

        span {
          font-weight: 600;
          font-size: 0.75em;
          line-height: 14px;
          color: $black-2;
        }

        .title-quote,
        .title-buying {
        }
        .text-area {
          flex: 1 1 auto;
        }
      }
    }
    .sub-title-observing {
      margin-top: 3rem;
      span {
        font-weight: 700;
        font-size: 1em;
        line-height: 19px;
        letter-spacing: 0.15px;
        color: $black-2;
      }
    }
    .form-observing {
      .header-form {
        background: $yellow-1;
        display: flex;
        align-items: center;
        gap: 0.5rem 2rem;
        margin: 0.5rem 0;
        padding: 0.8rem 0;
        position: relative;
        z-index: 10;

        &::after {
          content: "";
          position: absolute;
          height: 100%;
          left: -40px;
          right: -40px;
          background: $yellow-1;
          z-index: -1;
        }

        .name {
          span {
            font-weight: 700;
            font-size: 0.8em;
            line-height: 19px;
            letter-spacing: 0.15px;
            color: $black-2;
          }
        }

        & > div {
          flex: 1 1 200px;
        }
      }
      .body-form {
        .line-body {
          display: flex;
          align-items: center;
          gap: 0.5rem 2rem;
          flex-wrap: wrap;
          margin: 1rem 0;
          label {
            display: none;
            font-weight: 700;
            font-size: 0.8em;
            line-height: 19px;
            letter-spacing: 0.15px;
            color: $black-2;
          }

          & > div {
            flex: 1 1 150px;
          }
        }
        .btn-toppings {
          text-align: right;
          .btn {
            color: white;
            background: $blue-6;
          }
        }
      }
    }
  }
  .btn-toppings {
    text-align: right;
    .btn {
      color: white;
      background: $blue-6;
    }
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    .btn {
      width: 160px;
    }
    .save {
      color: white;
      background: $blue-6;
    }
  }
}

.container {
  display: block;
  position: relative;
  padding: 0 0 0 30px;
  cursor: pointer;
  margin-top: 0.5rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 23px;
  width: 23px;
  background-color: $grey-11;
  border-radius: 5px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 8px;
  top: 6px;
  width: 8px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

@media screen and (max-width: $window-500) {
  .form-content {
    & > div {
      & > div {
        .description {
          flex: 1 1 auto !important;
        }
      }
    }
  }
  .destination-and-coverage {
    .checkbox-area {
      .container {
        flex: 1 1 150px !important;
      }
    }
  }
}

@media screen and (max-width: $window-780) {
  .observing {
    .form-observing {
      .header-form {
        display: none !important;
      }
      .body-form {
        .line-body {
          border: 1px solid $grey-4;
          border-radius: 10px;
          background: $grey-13;
          padding: 0.5rem;
          label {
            display: block !important;
          }
        }
      }
    }
  }
}

</style>