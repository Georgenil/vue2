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
        <label>

        <div class="bar-archive">
          <label>Arquivo</label>
          <v-file-input
            show-size
            v-model="productWithDocument.uploadDocument"
            :rules="[
              (v) =>
                (v && v.size < 2000000) || 'Tamanho máximo permitido é de 2 MB',
            ]"
            @change="importDocument()"
            :loading="loading"
            accept=".jpg"
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
        </label>

        <div class="actions">
          <!-- <button class="delete" @click="remove(currentProduct.uploadDocument)">
            <span>Deletar</span>
          </button> -->
          <button class="download" @click="addDocument()">
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
        :items="products"
        :items-per-page="5"
        class="elevation-1"
        hide-default-footer
        @update="products"
      >
        <template v-slot:item.name="{ item }">
          {{ item.name != null ? item.name : "Sem registro" }}
        </template>

        <template v-slot:item.payment="{ item }">
          {{ item.payment == 0 ? "BOLETO" : "CARTÃO DE CRÉDITO" }}
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status == true ? "ATIVADO" : "DESATIVADO" }}
          </v-chip>
        </template>

        <template v-slot:[`item.ope`]="{ item }" class="slot-btns">
          <div class="slot-btns">
            <div class="btn" @click="openAndCloseDialog(item)">
              <img class="btn-icon" src="/imgs/icons/gift-icon.svg" />
            </div>
            <div class="btn" @click="doSomething(item)">
              <img class="btn-icon" src="/imgs/icons/reload-icon.svg" />
            </div>
            <a class="btn" :href="`/product-edit/${item.id}`" target="_blank">
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
import ApiService from "../../services/ApiService";
import HeaderRegisterProducts from "./HeaderRegisterProducts.vue";

export default {
  components: {
    HeaderRegisterProducts,
  },
  data() {
    return {
      apiService: new ApiService(),
      dialog: false,
      loading: false,
      productWithDocument: {},
      products: [],
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
  async created() {
    await this.getProducts();
  },
  methods: {
    importDocument() {
      const formateTypeDocument = this.productWithDocument.uploadDocument.name.lastIndexOf(".");
      this.fileType = this.productWithDocument.uploadDocument.name.substr(formateTypeDocument);

      var reader = new FileReader();
      reader.readAsDataURL(this.productWithDocument.uploadDocument);
      reader.onload = () => {
        this.fileData = reader.result;
      };
      this.dialog = false;
    },
    async addDocument() {
      const document = {
        Id: this.productWithDocument.uploadDocumentId,
        FileName: this.productWithDocument.uploadDocument.name,
        FileType: this.fileType,
        Size: this.productWithDocument.uploadDocument.size,
        File: this.fileData,
      };

      this.productWithDocument.uploadDocument = document;
      await this.apiService
        .put("Product/Add-Document", this.productWithDocument)
        .then((response) => {
          response.statusCode == 200
            ? this.$toast.success("Arquivo adicionado com sucesso!")
            : this.$toast.error("Não foi possível adicionar um arquivo");

          this.dialog = false;
        });
    },
    menseger(){
     return this.$toast.success("Produto editado com sucesso!")
    },
    async changeStatus(product) {
      const productId = product.id;
      await this.apiService
        .put(`Product/Change-Status/${productId}`)
        .then((response) => {
          if (response.statusCode == 200) {
            this.$toast.success("Status do produto foi alterado!");
            this.getProducts();
          }
        });
    },
    async getProducts() {
      await this.apiService.get("Product/List-Products").then((response) => {
        this.products = response.content;
      });
    },
    getColor(status) {
      if (status == true) return "green";
      else return "red";
    },
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
      font-weight: 600;
      font-size: 0.9em;
      line-height: 19px;
      color: $black-2;

      .input {
        flex: 1 1 auto;
        position: relative;
        height: 50px;
        border: 1px solid $grey-7;
        border-radius: 10px;
        overflow: hidden;
        .button-dowload {
          background: $blue-6;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        input {
          height: 100%;
          width: 100%;
          padding: 0 1rem;

          &:focus {
            outline: none;
          }
          &::placeholder {
            font-weight: 400;
          }
        }
      }
    }

    .button-item {
      position: absolute;
      right: 0;
      top: 19px;
      height: 56px;
      width: 60px;
      border-radius: 0px 5px 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: $blue-6;
    }
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
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
  border-radius: 20px;
  box-shadow: 0px 7px 20px rgba(96, 151, 168, 0.1) !important;
  padding-bottom: 2rem;

  .title-card {
    padding: 2rem;
    span {
      font-weight: 500;
      font-size: 0.95em;
      line-height: 21px;
      color: $black-2;
    }
  }
  .table-content {
    .v-data-table {
      box-shadow: none !important;

      &::v-deep .v-data-table__wrapper {
        table {
          .text-start {
            padding: 1.5rem;
          }
          .v-data-table-header {
            background: $yellow-1;
          }
        }
      }
    }
    .slot-btns {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .btn {
        border: 1px solid $blue-6;
        width: 34px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        cursor: pointer;

        img {
          width: 60%;
          height: 60%;
          object-fit: contain;
        }
      }
      .btn-active {
        background: $blue-6;
        padding: 0.4rem 0.7rem;
        border-radius: 6px;
        span {
          color: white;
        }
      }
    }
  }
  .operations-table {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    & > div {
      flex: 1 1 200px;
      align-items: center;
      justify-content: center;
    }
  }
  .menu {
    padding: 0 0.5rem;

    .clear-button {
      box-shadow: none;
      background: none;
    }
  }
}

.activeClass {
  color: $green-1 !important;
  font-weight: 500;
}
.desactiveClass {
  color: $red-1 !important;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 0.15px;
}
</style>