<template>
  <div class="container">
    <my-header></my-header>
    <!-- 表单 -->
    <a-row class="form" type="flex" justify="center">
      <!-- 表单长度 -->
      <a-col class="panel" :xs="xsSize" :md="mdSize" :lg="lgSize">
        <!-- 表单标题 -->
        <a-row class="panel-header">
          <a-col>Pet Depot Checkout</a-col>
        </a-row>

        <!-- 表单内容 -->
        <a-row class="panel-body">
          <a-form-model ref="ruleForm" :model="order" :rules="rules">
            <a-col>
              <!-- 第一行 -->
              <a-row>
                <a-col>
                  <h4>
                    <strong>Enter Your Information</strong>
                  </h4>
                </a-col>
              </a-row>

              <!-- 第二行 -->
              <a-row type="flex">
                <!-- 名字 -->
                <a-col :flex="10">
                  <!-- <strong>First Name:</strong> -->
                  <a-form-model-item label="First Name" ref="name" prop="firstName">
                    <a-input v-model="order.firstName" />
                  </a-form-model-item>
                </a-col>

                <!-- 姓名 -->
                <a-col :flex="10">
                  <!-- <strong>last Name:</strong> -->
                  <a-form-model-item label="Last Name" prop="lastName">
                    <a-input v-model.trim="order.lastName"></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <!-- 第三行 -->
              <a-row>
                <!-- 地址栏 -->
                <a-col>
                  <!-- <strong>Address:</strong> -->
                  <a-form-model-item label="Address" prop="address">
                    <a-input v-model="order.address"></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <!-- 第四行 -->
              <a-row>
                <!-- 城市 -->
                <a-col>
                  <!-- <strong>City:</strong> -->
                  <a-form-model-item label="City" prop="city">
                    <a-input v-model="order.city"></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <!-- 第五行 -->
              <a-row type="flex" justify="space-between">
                <!-- 地区 -->
                <a-col :flex="10">
                  <!-- <strong>State:</strong> -->
                  <a-form-model-item label="State" prop="state">
                    <a-select v-model="order.state" style="width: 120px">
                      <a-select-option value disabled>state</a-select-option>
                      <a-select-option v-for="(state, name) in states" :key="state">{{ name }}</a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>

                <!-- 邮政号 -->
                <a-col :flex="7">
                  <!-- <strong>Zip / Postal Code:</strong> -->
                  <a-form-model-item label="Zip / Postal Code" prop="zip">
                    <a-input v-model="order.zip"></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <!-- 第六行 -->
              <a-row type="flex" justify="space-between" style="padding-top: 20px">
                <!-- 确认是否礼物 -->
                <a-col>
                  <a-form-model-item>
                    <a-switch @change="onChange" />
                    <strong>&nbsp;Ship As Gift?</strong>
                  </a-form-model-item>
                </a-col>

                <!-- 确认地址属性 -->
                <a-col style="float: right">
                  <a-form-model-item>
                    <a-radio-group v-model="order.method" button-style="solid">
                      <a-radio-button
                        v-for="(method, name) in methods"
                        :key="name"
                        :value="method"
                      >{{ name }}</a-radio-button>
                    </a-radio-group>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <!-- 第七行 -->
              <a-row type="flex" justify="center" class="button">
                <!-- 确认按钮 -->
                <a-col>
                  <a-button size="large" type="primary" v-on:click="submitForm">Place Order</a-button>
                </a-col>
              </a-row>

              <!-- 第八行 -->
              <a-row>
                <a-col>
                  <pre>
                    First Name: {{ order.firstName }}
                    Last Name:  {{ order.lastName }}
                    Address:    {{ order.address }}
                    City:       {{ order.city }}
                    Zip:        {{ order.zip }}
                    State:      {{ order.state }}
                    Method:     {{ order.method }}
                    Gift:       {{ order.gift }}
                </pre>
                </a-col>
              </a-row>
            </a-col>
          </a-form-model>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import MyHeader from "./Header";
export default {
  data() {
    return {
      mdSize: {
        span: 24,
      },
      lgSize: {
        span: 14,
      },
      xsSize: {
        span: 24,
      },
      states: {
        AL: "Alabama",
        AK: "Alaska",
        AR: "Arizona",
        CA: "California",
        NV: "Nevada",
      },
      gift: {
        sendGift: "Send As A Gift",
        dontSendGift: "Do Not Send As A Gift",
      },
      methods: {
        Home: "Home Address",
        Business: "Business Address",
      },
      order: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        gift: "Do Not Send As A Gift",
        method: "Home Address",
      },
      rules: {
        firstName: [
          {
            required: true,
            message: "Please input Activity firstName",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please input Activity lastName",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "Please input Activity address",
            trigger: "blur",
          },
        ],
        city: [
          {
            required: true,
            message: "Please input Activity city",
            trigger: "blur",
          },
        ],
        state: [
          {
            required: true,
            message: "Please select Activity state",
            trigger: "change",
          },
        ],
        zip: [
          {
            required: true,
            message: "Please input Activity zip",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    // 礼物开关判定
    onChange(checked) {
      this.order.gift = checked ? this.gift.sendGift : this.gift.dontSendGift;
      console.log(this.order.gift);
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  
};
</script>

<style lang="css" scoped>
.form {
  position: relative;
  width: 100%;
  top: 30px;
  height: calc(100% - 90px);
  padding-bottom: 50px;
  /* overflow: scroll;
  overflow-x: hidden; */
}
.form .panel {
  display: block;
  border: 1px solid #bce8f1;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin: 0 0px;
}
.form .panel .panel-header {
  color: #31708f;
  background-color: #d9edf7;
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  width: 100%;
  font-size: 18px;
}
.form .panel .panel-body {
  padding: 15px;
}
.form .panel .panel-body .ant-col {
  margin: 0px 15px;
  /* font-size: 16px; */
}
/* 取消 加入form-item的位置样式 */
/*
.form .panel .panel-body .ant-col .ant-form-item {
  margin: 0px; 
  设置字体样式
  font-size: 16px;
}
*/
.form .panel .panel-body h4 {
  font-size: 20px;
  margin: 0;
}

.form .panel .panel-body .button {
  padding-bottom: 20px;
}
.form .panel .panel-body pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>