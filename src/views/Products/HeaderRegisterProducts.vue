<template>
  <v-card class="d-flex align-center pa-0 my-5" elevation="0">
    <v-row class="ma-0">
      <v-col cols="12" sm="8" md="8" lg="8">
        <v-card-title class="main-title"> 
          <span >
            {{ title }}
          </span>
        </v-card-title>

        <v-card-text class="main-description" style="white-space: pre-wrap">
          {{ text }}
        </v-card-text>
      </v-col>

      <v-col v-if="haveCustomButton" cols="12" sm="3" md="3" lg="3">
        <v-btn
          block
          dark
          elevation="0"
          height="40"
          class="add-button mb-3"
          @click="action2"
        >
          {{ buttonTitle }}
        </v-btn>

        <v-btn
          block
          dark
          elevation="0"
          height="40"
          class="add-button mb-3"
          @click="action3"
        >
          {{ buttonTitle2 }}
        </v-btn>
      </v-col>

      <v-col cols="12" sm="3" md="3" lg="3" v-if="haveAction">
        <v-btn
          block
          outlined
          height="40"
          class="hidden-sm-and-down config-button mb-3 pa-0"
          style="width: -webkit-fill-available !important"
          @click="action3"
        >
          <v-icon class="ma-0 mr-1 pa-0">mdi-cog</v-icon>
          <span class="hidden-md-and-down"> Configurações de produtos </span>
        </v-btn>

        <v-btn
          block
          outlined
          height="40"
          class="hidden-sm-and-down config-button mb-3 pa-0"
          style="width: -webkit-fill-available !important"
          @click="action4"
        >
          <v-icon class="ma-0 mr-1 pa-0">mdi-scissors-cutting</v-icon>
          <span class="hidden-md-and-down"> Cupons de desconto </span>
        </v-btn>

        <v-btn
          block
          outlined
          height="40"
          class="hidden-md-and-up config-button mb-3"
          @click="action3"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-btn
          block
          outlined
          height="40"
          class="hidden-md-and-up config-button mb-3"
          @click="action4"
        >
          <v-icon>mdi-scissors-cutting</v-icon>
        </v-btn>
        <v-btn
          block
          outlined
          height="40"
          class="hidden-sm-and-down config-button mb-3 pa-0"
          style="width: -webkit-fill-available !important"
          @click="action5"
        >
          <v-icon class="ma-0 mr-1 pa-0">mdi-cloud-upload-outline</v-icon>
          <span class="hidden-md-and-down"> Importar produtos </span>
        </v-btn>
        <v-btn
          block
          outlined
          height="40"
          class="hidden-md-and-up config-button mb-3"
          @click="action5"
        >
          <v-icon>mdi-cloud-upload-outline</v-icon>
        </v-btn>

        <v-btn
          block
          dark
          elevation="0"
          height="40"
          class="hidden-sm-and-down add-button mb-3"
          @click="action"
        >
          Novo produto
        </v-btn>

        <v-btn
          dark
          elevation="0"
          block
          height="40"
          class="hidden-md-and-up add-button"
          @click="action"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
@media (max-width: 900px) {
  .main-title {
    font-size: 1.3rem !important;
  }
}
.main-title {
  font-family: Roboto;
  font-size: 1.5rem !important;

  color: #000000;
}

.main-description {
  display: flex;
  justify-content: space-between;

  font-family: Roboto;
  font-size: 1rem;
  font-weight: 300;
  line-height: 30px;

  width: 80%;

  color: #9c9c9c;
}

.config-button {
  transition: 0.3s;
  border-radius: 7.5px !important;
}

.config-button:hover {
  background: #000000 !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  color: #ffffff !important;
}

.add-button {
  transition: 0.3s;
  font-weight: bold !important;
  font-size: 16px !important;
  color: #ffffff !important;
  background: #bc0000 !important;
  border-radius: 7.5px !important;
}

.add-button:hover {
  background: #e8161e !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>

<script>
export default {
  name: "HeaderRegisterProducts",

  data: () => ({}),
  props: {
    title: String,
    text: String,
    actionTitle: String,
    haveAction: Boolean,
    mainPage: Boolean,
    haveBack: Boolean,
    buttonTitle: String,
    buttonTitle2: String,
    haveCustomButton: Boolean,
  },

  methods: {
    action() {
      this.$emit("action");
    },

    action2() {
      this.$emit("action2");
    },

    action3() {
      this.$emit("action3");
    },
    action4() {
      this.$emit("action4");
    },
    action5() {
      this.$emit("action5");
    },

    back() {
      this.$emit("voltar");
    },
  },
};
</script>
