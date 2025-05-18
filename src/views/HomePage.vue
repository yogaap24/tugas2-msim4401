<!-- src/views/HomeView.vue -->
<template>
  <ion-page>
    <ion-content class="ion-padding" @scroll.passive="handleScroll">

      <!-- Tombol Get Data -->
      <div class="button-container">
        <ion-button @click="loadData">Get Data</ion-button>
      </div>

      <!-- Tabel hanya tampil kalau ada data -->
      <div v-if="cryptos.length" class="table-container">
        <table class="crypto-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Harga USD</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="coin in cryptos" :key="coin.id">
              <td>{{ coin.name }}</td>
              <td>{{ coin.symbol }}</td>
              <td>{{ coin.price_usd }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CryptoService, { Crypto } from '@/services/crypto.service';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const cryptos = ref<Crypto[]>([]);
    const page = ref(1);
    const hasMoreData = ref(true);

    const loadData = async () => {
      if (!hasMoreData.value) return;

      try {
        const newCryptos = await CryptoService.getCryptos(page.value);
        if (newCryptos.length > 0) {
          cryptos.value = [...cryptos.value, ...newCryptos];
          page.value += 1;
        } else {
          hasMoreData.value = false;
        }
      } catch (e) {
        console.error('Error fetching cryptocurrencies:', e);
      }
    };

    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        loadData();
      }
    };

    return { cryptos, loadData, handleScroll };
  }
});
</script>

/* src/views/HomeView.vue */
<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* memastikan latar dan teks konten ikut variable Ionic */
ion-content {
  --background: var(--ion-background-color);
  --color: var(--ion-text-color);
  --padding-start: 12px;
  --padding-end: 12px;
}

ion-button {
  --color: white;
  margin: 10px auto;
  --padding-start: 24px;
  --padding-end: 24px;
}

.table-container {
  overflow-x: auto;
  margin: 0 -12px;
  padding: 0 12px;
}

.crypto-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--ion-border-color);
  background: var(--ion-background-color);
  color: var(--ion-text-color);
  font-size: 14px;
}

.crypto-table th,
.crypto-table td {
  padding: 12px 8px;
  text-align: left;
}

.crypto-table thead {
  color: #010101;
  border: 1px solid var(--ion-border-color);
}

.crypto-table th {
  font-weight: bold;
}
</style>