<script setup>
const animalInput = ref('')
const result = ref('')

async function onSubmit(event) {
    try {
      const response = await $fetch("/api/generate", {
        method: 'post',
        body: { animal: animalInput.value }
      })

      const data = await response
      result.value = data.text
      console.log(data)
      animalInput.value = ""

      if (response.status !== 200) {
        new Error(`Request failed with status ${response.status}`);
      }
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }
</script>

<template>
    <div>
      <main class="main">

        <img src="/dog.png" class="icon" />
        <h3>Name my pet</h3>

        <form @submit.prevent="onSubmit">
        <!-- <div> -->
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            :value="animalInput"
            :v-model="animalInput"
          />
          <input type="submit" value="Generate names" />
        </form>
        <div class="result">{{result}}</div>
      </main>
    </div>
</template>