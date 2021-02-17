<template>
  <form @submit.prevent="submitForm">
    <div :class="{ invalid: !firstName.isValid }" class="form-control">
      <label for="firstName">Firstname</label>
      <input
        @blur="clearValidity('firstName')"
        v-model.trim="firstName.val"
        type="text"
        id="firstName"
      />
      <p v-if="!firstName.isValid">Firstname must not be empty</p>
    </div>
    <div :class="{ invalid: !lastName.isValid }" class="form-control">
      <label for="lastName">Lastname</label>
      <input
        @blur="clearValidity('lastName')"
        v-model.trim="lastName.val"
        type="text"
        id="lastName"
      />
      <p v-if="!lastName.isValid">Lastname must not be empty</p>
    </div>
    <div :class="{ invalid: !description.isValid }" class="form-control">
      <label for="description">Description</label>
      <textarea
        @blur="clearValidity('description')"
        v-model.trim="description.val"
        rows="5"
        id="description"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div :class="{ invalid: !rate.isValid }" class="form-control">
      <label for="rate">Hourly Rate</label>
      <input
        @blur="clearValidity('rate')"
        v-model.number="rate.val"
        type="number"
        id="rate"
      />
      <p v-if="!rate.isValid">Rate must be greater than 0</p>
    </div>
    <div :class="{ invalid: !areas.isValid }" class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          @blur="clearValidity('areas')"
          v-model="areas.val"
          type="checkbox"
          id="frontend"
          value="frontend"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          @blur="clearValidity('areas')"
          v-model="areas.val"
          type="checkbox"
          id="backend"
          value="backend"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          @blur="clearValidity('areas')"
          v-model="areas.val"
          type="checkbox"
          id="career"
          value="career"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors!</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val
      };
      this.$emit('save-data', formData);
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
