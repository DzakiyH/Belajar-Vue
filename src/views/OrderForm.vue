<template>
<div>
<NavBar/>
<b-container>
  <div class="detail-toko">
    <h2>Form Pesan</h2><br>
    <b-row>
      <b-col> Nama Toko: </b-col>
      <b-col> {{merchant.nama}} </b-col>
    </b-row>
    <b-row>
      <b-col> Alamat Toko: </b-col>
      <b-col> {{merchant.alamat}} </b-col>
    </b-row>
  </div>

  <hr>

  <div class="form">
    <b-form @submit="onSubmit">
      <div class="file-input">
        <input type="file" @change="enableUpload" required>
        <div v-if="file">
          <button @click="upload">Upload</button>
          <progress id="progress" :value="uploadValue" max="100"></progress>
          <p>{{suksesUpload}}</p>
        </div>
      </div>

      <div class="detail-input">
        <b-row>
          <b-col sm="4">
            <label for="form-jenis-kertas" class="mt-1">Jenis Kertas:</label>
          </b-col>
          <b-col sm="8">
            <b-select
              id="form-jenis-kertas"
              class="mb-2 mr-sm-2 mb-sm-0"
              :options="kertas"
              v-model="pesanan.jenisKertas"
              required
            ></b-select>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="inline-form-input-copy" class="mt-3">Banyak Copy:</label>
          </b-col>
            <b-col sm="3">
              <b-input-group append="copy" class="mb-2 mr-sm-2 mb-sm-0 mt-2">
                <b-input id="inline-form-input-copy" v-model="pesanan.jumlahCopy" type="number" min="1" oninput="validity.valid||(value='');" required></b-input>
              </b-input-group>
            </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="warna" class="mt-3">Warna:</label>
          </b-col>
          <b-col sm="4">
            <b-form-group>
              <b-form-radio-group id="warna" v-model="pesanan.warna" name="warna" class="mt-3" required>
                <b-form-radio value="tidak">Hitam Putih</b-form-radio>
                <b-form-radio value="iya">Berwarna</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="4">
            <label for="catatan" class="mt-3">Catatan:</label>
          </b-col>
          <b-col sm="8">
            <b-form-textarea
              id="catatan"
              v-model="pesanan.catatan"
              placeholder="Catatan tambahan..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-col>
        </b-row>
      </div>
      <button type="submit">Submit</button>
    </b-form>
  </div>
</b-container>
</div>
</template>

<script>

import firebase from 'firebase'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'ShowBoard',
  components:{
    NavBar
  },
  data () {
    return {
      transactionRef: firebase.firestore().collection('transaction'),
      key: '',
      merchant: {},
      file: false,
      fileData: null,
      fileUrl: '',
      suksesUpload:'',
      uploadValue: 0,
      kertas: ['HVS A4', 'HVS A3'],
      pesanan:{
        client:'',
        toko: '',
        jenisKertas: '',
        fileRef: '',
        jumlahCopy:'',
        warna:'',
        waktuPesan:'',
        harga:'0',
        status: 'Sedang diproses',
        fileName: '',
        catatan:''
      }
    }
  },
  created () {
    const ref = firebase.firestore().collection('merchant').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.merchant = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    enableUpload(){
      this.file = true
      this.fileData = event.target.files[0]

    },
    upload(){
      const storageRef = firebase.storage().ref(`${this.fileData.name}`).put(this.fileData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.fileUrl = url;
          this.pesanan.fileRef = url;
          this.suksesUpload = 'Upload berhasil!'
          this.pesanan.fileName = this.fileData.name
        });
      }
    );
    },

    onSubmit(evt){
      evt.preventDefault()
      this.getNow()
      this.pesanan.client = firebase.auth().currentUser.email
      this.pesanan.toko = this.merchant.nama
      // console.log(this.pesanan)
      this.transactionRef.add(this.pesanan)
      this.$router.push('/transactions')
    },
    getNow(){
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date +' '+ time;
      this.pesanan.waktuPesan = dateTime;
    }
  }
}
</script>

<style>
.form{
  padding-top: 50px
}
.detail-input{
  padding-top: 20px
}
</style>