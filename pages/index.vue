<!-- Please remove this file from your project -->
<template>
  <div class="d-flex p-20">
    <div class="container" style="background-color: white;">
    จำนวนนักเรียนที่เหลือ : {{arrSize}}
    <div class="row justify-content-center">
      <div class="col">
        <div class="row justify-content-center">
          <div class="row">
            <img src="@/assets/img/sorthat.png">
          </div>
          <div class="row form-group">
            <label for="yourname">หมวกคัดสรรจะเลือกเจ้า จงใส่ชื่อของเจ้า</label>
            <input  id="yourname" v-model="name" class="form-control"  >
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-6">
            <button type="button" class="btn btn-primary" @click="addWithInput">คัดบ้าน</button>
            <button type="button" class="btn btn-primary" @click="addWithRanName">Random ชื่อคัดบ้าน</button>
            <button type="button" class="btn btn-primary" @click="bulkAdd">Random ชื่อคัดบ้าน 50 คน</button>
            <button type="button" class="btn btn-warning" @click="init">เริ่มใหม่</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col">
        <div class="card" style="width: 12rem;">
          <img src="@/assets/img/Gryffindor.png" class="card-img-top" alt=".">
          <div class="card-body">
            <h5 class="card-title">Gryffindor : {{house.Gryffindor.value.length}}</h5>
            {{house.Gryffindor.value}}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="width: 12rem;">
          <img src="@/assets/img/Hufflepuff.png" class="card-img-top" alt=".">
          <div class="card-body">
            <h5 class="card-title">Hufflepuff : {{house.Hufflepuff.value.length}}</h5>
            {{house.Hufflepuff.value}}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="width: 12rem;">
          <img src="@/assets/img/Ravenclaw.png" class="card-img-top" alt=".">
          <div class="card-body">
            <h5 class="card-title">Ravenclaw : {{house.Ravenclaw.value.length}}</h5>
            {{house.Ravenclaw.value}}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="width: 12rem;">
          <img src="@/assets/img/Slytherin.png" class="card-img-top" alt=".">
          <div class="card-body">
            <h5 class="card-title">Slytherin : {{house.Slytherin.value.length}}</h5>
            {{house.Slytherin.value}}
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      house:{},
      arrSize:0,
      name:"",
      msgalert:true
    }
  },
  created() {
    this.init()
  },

  methods: {
    init(){
      this.arrSize = 50
      const expectWeight= Math.ceil(this.arrSize/4)
      // console.log(expectWeight)
      this.house = {
        "Gryffindor":{ 
          weight : Number(expectWeight),
          value:[]
        },
        "Hufflepuff":{ 
          weight :  Number(expectWeight),
          value:[]
        },
        "Ravenclaw":{ 
          weight :  Number(expectWeight),
          value:[]
        },
        "Slytherin":{ 
          weight :  Number(expectWeight),
          value:[]
        },
      };
    },

    bulkAdd(){
      this.msgalert = false;
      for (let i = 0; i < this.arrSize; i++) {
        console.log("arr size",this.arrSize)
        this.addWithRanName();
      }
    },

    addWithInput(){
      if(this.name && this.arrSize > 0)this.magicHat(this.name);
      else if(this.arrSize == 0)alert("นักเรียนครบแล้ว");
      else alert("กรุณาป้อนชื่อ");
    },
    async addWithRanName(){
      const ranName = await this.getName();
      if(this.arrSize > 0)this.magicHat(ranName);
      else alert("นักเรียนครบแล้ว");
    },

    async magicHat(name){
        const key = await this.ranWithWeight(this.house);
        if(this.msgalert)alert(`${name} บ้านของเจ้าคือ ${key}`);
        this.house[key].weight--;
        // console.log("declar",this.house[key].weight);
        this.house[key].value.push(name);
        this.arrSize--;
        this.name = "";
    },

    async getName() {
      try {
        // api random name
        const name = await this.$axios.$get('http://localhost:3005/api/');
      return name
      } catch (error) {
        console.log(error);
        return ""
      }
    },

    ranWithWeight(items){
      const table = Object.entries(items)
        .flatMap(([key, item]) => Array(item.weight).fill(key))
      return table[Math.floor(Math.random() * table.length)]
    },
  }
}
</script>
