<template>
  <v-card class="card">
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
          <span>Incluir Fotos</span>
        </div>
        <div class="bar-archive">
          <!-- <label
            >Arquivo

            <div class="input">
              <input
                type="text"
                @click="download()"
                placeholder="Selecione um arquivo"
                readonly
              />
              <div class="button-dowload">
                <img src="/imgs/icons/download.svg" alt="Download" />
              </div>
            </div>
          </label> -->

          <label>
            <div class="button-item">
              <img src="/imgs/icons/download.svg" alt="Ícone" />
            </div>
            <v-file-input
              show-size
              v-model="currentDocument"
              :rules="[
                (v) =>
                  (v && v.size < 2000000) ||
                  'Tamanho máximo permitido é de 2 MB',
              ]"
              name="file"
              accept=".jpeg"
              :loading="loading"
              outlined
              prepend-icon=""

              class="primary-input"
            >
            </v-file-input>
          </label>
        </div>

        <div class="actions">
          <button class="delete" @click="remove(currentDocument)">
            <span>Deletar</span>
          </button>
          <button v-if="isEditing == true" class="download">
            <span>Baixar</span>
          </button>
          <button class="download" @click="importDocument()">
            <span>Enviar</span>
          </button>
        </div>
      </v-card>
    </v-dialog>

    <section class="data-main-plan">
      <div class="title">
        <span> Dados dos produtos</span>
      </div>
      <div class="form-content">
        <div class="left">
          <div class="name">
            <div class="description">
              <label> Nome do doce</label>
            </div>
            <div class="item">
              <v-text-field
                v-model="product.name"
                single-line
                outlined
                style="border-radius: 10px"
                placeholder="Escreva o nome do produto"
                :rules="[(v) => !!v || 'Nome requerido']"
              ></v-text-field>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="subscribe">
            <div class="description">
              <label>Fornecedor</label>
            </div>
            <div class="item">
              <v-select
                v-model="product.SupplierId"
                :items="suppliers"
                item-text="name"
                item-value="id"
                single-line
                outlined
                style="border-radius: 10px"
                placeholder="Selecionar fornecedor"
                append-icon="mdi-chevron-down"
              ></v-select>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="payment">
      <div class="title">
        <span>Pagamento</span>
      </div>

      <div class="desctiptions">
        <span class="title-desc"
          >Informe as configurações financeiras para o pagamento:</span
        >
        <span class="sub-title"
          >Você pode selecionar um dos métodos de pagamento
        </span>
      </div>

      <div class="payment-type">
        <label class="container">
          Boleto
          <input type="radio" value="1" v-model="product.Payment" />
          <span class="checkmark"></span>
        </label>
        <label class="container">
          Cartão de Débito
          <input type="radio" value="2" v-model="product.Payment" />
          <span class="checkmark"></span>
        </label>
        <label class="container">
          Cartão de Crédito
          <input type="radio" value="3" v-model="product.Payment" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="inputs-payment">
        <div class="left">
          <div class="cambio">
            <div class="block-1">
              <div class="description">
                <label> Informe o valor do produto</label>
              </div>
              <div class="input">
                <v-text-field
                  v-model="product.price"
                  single-line
                  outlined
                  style="border-radius: 10px"
                  placeholder="0"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="block-1">
            <div>
              <div class="description">
                <label> Quantidade de parcelas</label>
              </div>
              <div class="item">
                <v-text-field
                  v-model="product.Installments"
                  single-line
                  outlined
                  style="border-radius: 10px"
                  placeholder="0,0"
                ></v-text-field>
              </div>
            </div>

            <div>
              <div class="description">
                <label> % de desconto a vista</label>
              </div>
              <div class="item">
                <v-text-field
                  v-model="product.Discont"
                  single-line
                  outlined
                  style="border-radius: 10px"
                  placeholder="0"
                ></v-text-field>
              </div>
            </div>
          </div>

          <div class="block-2">
            <div>
              <div class="description">
                <label> Preço no varejo</label>
              </div>
              <div class="item">
                <v-text-field
                  v-model="product.Tariff"
                  single-line
                  outlined
                  style="border-radius: 10px"
                  placeholder="0"
                ></v-text-field>
              </div>
            </div>

            <div>
              <div class="description">
                <label> Quantidade de dias para entrega (Máximo)</label>
              </div>
              <div class="item">
                <v-text-field
                  v-model="product.MinimumDay"
                  single-line
                  outlined
                  style="border-radius: 10px"
                  placeholder="0"
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="observing">
      <div class="title">
        <span> Observações do produto e compra </span>
      </div>
      <div class="content-observing">
        <div class="observing-quote">
          <div class="title-quote">
            <span>Observação da produto</span>
          </div>
          <div class="text-area">
            <v-textarea
              v-model="product.QuoteObservation"
              outlined
              style="border-radius: 10px"
              placeholder="Digite aqui"
            ></v-textarea>
          </div>
        </div>
        <div class="observing-buying">
          <div class="title-buying">
            <span> Observação da compra </span>
          </div>
          <div class="text-area">
            <v-textarea
              v-model="product.BuyObservation"
              outlined
              style="border-radius: 10px"
              placeholder="Digite aqui"
            ></v-textarea>
          </div>
        </div>
      </div>
      <!-- <div class="sub-title-observing">
        <span>Adicionais para bolo: </span>
      </div>

      <div class="form-observing">
        <div class="header-form">
          <div class="name">
            <span>Idade de</span>
          </div>
          <div class="name">
            <span>Idade até</span>
          </div>
          <div class="name">
            <span>Percentual</span>
          </div>
          <div class="name">
            <span>Tipo</span>
          </div>
        </div>

        <div class="body-form">
          <div class="line-body" v-for="(item, i) in travelers" :key="i">
            <div class="item-line">
              <label>Idade de</label>
              <v-text-field
                v-model="item.minimumAge"
                single-line
                outlined
                dense
                style="border-radius: 10px"
                placeholder="0"
              ></v-text-field>
            </div>
            <div class="item-line">
              <label>Idade até</label>
              <v-text-field
                v-model="item.maximumAge"
                single-line
                outlined
                dense
                style="border-radius: 10px"
                placeholder="0"
              ></v-text-field>
            </div>
            <div class="item-line">
              <label>Percentual</label>
              <v-text-field
                v-model="item.percentage"
                single-line
                outlined
                dense
                style="border-radius: 10px"
                placeholder="0,0"
              ></v-text-field>
            </div>
            <div class="item-line">
              <label>Tipo</label>
              <v-select
                v-model="item.type"
                :key="i"
                :items="paymentTypes"
                single-line
                outlined
                dense
                style="border-radius: 10px"
                placeholder="Selecione"
                append-icon="mdi-chevron-down"
              ></v-select>
            </div>
          </div>
          <div class="btn-toppings">
            <v-btn depressed class="btn mr-2" large @click="addNewTraveler()">
              Incluir
            </v-btn>
            <v-btn depressed class="btn" large @click="deleteLastTraveler()">
              Excluir
            </v-btn>
          </div>
        </div>
      </div> -->
      <div class="btn-toppings">
        <v-btn depressed class="btn" large @click="openAndCloseDialog">
          Incluir Fotos
        </v-btn>
      </div>
    </section>

    <section class="buttons">
      <v-btn depressed class="btn save" @click="submit()" large> Salvar </v-btn>
      <v-btn class="btn" outlined color="indigo" large> Cancelar </v-btn>
    </section>
  </v-card>
</template>
<script>
import ApiService from "../../services/ApiService";
export default {
  data: () => ({
    apiService: new ApiService(),
    isEditing: false,
    loading: false,
    suppliers: [],
    dialog: false,
    fileType: null,
    fileData: null,
    currentDocument: null,
    UploadDocument: {},
    product: {
      name: "",
      price: 0,
      payment: 0,
      quoteObservation:"",
      buyObservation:"",
      status:true,
      uploadDocument:{},
      supplier:{},
    },
    // money: {
    //   decimal: ",",
    //   thousands: ".",
    //   prefix: "R$",
    //   precision: 2,
    //   masked: false,
    // },
    // directives: { money: VMoney },
  }),
  async created() {
    await this.getSupplier();
  },
  methods: {
    async download() {},
    importDocument() {
      const formateTypeDocument = this.currentDocument.name.lastIndexOf(".");
      this.fileType = this.currentDocument.name.substr(formateTypeDocument);

      var reader = new FileReader();
      reader.readAsDataURL(this.currentDocument);
      reader.onload = () => {
        this.fileData = reader.result;
      };
      this.dialog = false;
    },
    async remove() {
      this.currentDocument = {};
      this.loading = false;
    },

    async getSupplier() {
      await this.apiService
        .get("Supplier/List-Suppliers")
        .then((response) => {
          this.suppliers = response.content;
        })
        // .catch((err) => {
        //   this.errorMessage = err.body.message;
        //   this.error = true;

        //   setTimeout(() => {
        //     this.error = false;
        //   }, 4000);
        // });
    },
    async getCoin() {
      await this.apiService
        .get("Coin/List-Coins")
        .then((response) => {
          this.coins = response.content;
        })
        .catch((err) => {
          this.errorMessage = err.body.message;
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 4000);
        });
    },
    async getDestination() {
      await this.apiService
        .get("Destination/List-Destinations")
        .then((response) => (this.destinations = response.content))
        .catch((err) => {
          this.errorMessage = err.body.message;
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 4000);
        });
    },
    async getTraveler() {
      await this.apiService
        .get("Traveler/list")
        .then(
          (response) => (this.product.TravelerModificators = response.content)
        )
        .catch((err) => {
          this.errorMessage = err.body.message;
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 4000);
        });
    },
    openAndCloseDialog() {
      this.dialog == true ? (this.dialog = false) : (this.dialog = true);
    },
    async submit() {
      const travelersResult = this.travelers.filter((x) => {
        return x.minimumAge || x.maximumAge || x.percentage || x.type;
      });
      travelersResult.map((x) => {
        x.type = this.paymentTypes.indexOf(x.type);
      });

      this.fillDestination();

      this.product.TravelerModificators = travelersResult;

      const document = {
        Id: this.currentDocument != null ? this.currentDocument.id : null,
        FileName: this.currentDocument.name,
        FileType: this.fileType,
        Size: this.currentDocument.size,
        File: this.fileData,
      };
      this.product.UploadDocument = document;

      this.coverageSelected = this.coverageTypes.map((x) => {
        if (x.coinId != 0) {
          return x;
        }
      });
      const product = {
        Name: this.product.Name,
        Payment: this.product.Payment,
        Excharge: this.product.Excharge,
        Installments: this.product.Installments,
        MinimumDay: this.product.MinimumDay,
        MaximumDay: this.product.MaximumDay,
        DayPrice: this.product.DayPrice,
        Discont: this.product.Discont,
        Tariff: this.product.Tariff,
        QuoteObservation: this.product.QuoteObservation,
        BuyObservation: this.product.BuyObservation,
        SupplierId: this.product.SupplierId,
        OriginId: this.product.OriginId,
        Coverages: this.coverageSelected,
        TravelerModificators: this.product.TravelerModificators,
        Destinations: this.product.Destinations,
        Status: true,
        UploadDocument: this.product.UploadDocument,
      };

      await this.apiService.post("Product/Add", product).then((response) => {
        if (response.content.statusCode == 200) {
          this.loading = false;
          this.$toast.success("Produto cadastrado com sucesso");
          this.product = {};
        }
        // this.$refs.form.reset();
      });
    },
    fillDestination() {
      for (let i = 0; i < this.destinationsSelected.length; i++) {
        if (this.destinationsSelected[i] == true) {
          this.product.Destinations.push({
            destinationId: this.destinations[i].id,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/sass/breakpoints.scss";
@import "@/styles/sass/colors.scss";

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

      @media (max-width: $window-648) {
        .primary-input {
          width: 100%;
        }
        .button-item {
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
