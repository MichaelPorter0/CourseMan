<template>
  <div class="loginform">
    <p id="comname">天圆地方</p>
    <img id="comlogo" src="../assets/1554964825.png">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="邮箱:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="密码:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="职位:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.Permission"
          :options="Permissions"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="term">我已经阅读使用条例</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">登录</b-button>
      <b-button type="reset" variant="danger">清空</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
export default {
  name: 'loginform',
  data () {
    return {
      form: {
        email: '',
        password: '',
        Permission: null,
        checked: []
      },
      Permissions: [{ text: 'Select One', value: null }, '老师', '管理员'],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
<style scoped>
.loginform{
  width: 30%;
  background: white
}
#comname{
  font-size: 170%;
  color: black;
}
#comlogo{
  width: 20%;
}

</style>
