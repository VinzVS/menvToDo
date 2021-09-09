<template>
    <div class="container">
        <div class="row">
            <div id="app" class="mt-3">
                <div class="header">
                    <div class="container">
                        <div class="form">
                            <form @submit.prevent="sendData">
                                <div class="row g-6 align-items-center">
                                    <div class="col-auto">
                                        <input type="text" v-bind:value="valueInput" v-on:input='taskInput' v-on:keypress.enter="addTask" class="form-control">
                                    </div>
                                    <div class="col-auto">
                                        <button type="submit" class="btn btn-primary" v-on:click='addTask' :disabled="valueInput.length < 1" >Добавить задачу</button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
                <div class="container mt-3">
                    <div class="row">
                        <h2>
                            <span>Осталось дел </span>
                            <span >{{needDoList.length}}</span>
                        </h2>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">что сделать</th>
                                <th scope="col">id</th>
                                <th scope="col">выполнено</th>
                                <th scope="col">удалить</th>
                            </tr>
                            </thead>
                            <tbody class="table-striped">
                            <tr v-for="(task, index) in needDoList" :key="task._id">
                                <th scope="row">{{index}}</th>
                                <td>{{task.valueInput}}</td>
                                <td>{{task._id}}</td>
                                <td><input type="checkbox" class="form-check-input" v-on:change="doCheck(task._id, index,'need')"></td>
                                <td><button class="btn btn-outline-danger" v-on:click="removeTask(task._id, index,'need')">remove</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="container mt-3">
                    <h2>
                        <span>Завершенные дела </span>
                        <span>{{completeList.length}}</span>
                    </h2>
                    <table class="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">что сделать</th>
                            <th scope="col">id</th>
                            <th scope="col">выполнено</th>
                            <th scope="col">удалить</th>
                        </tr>
                        </thead>
                        <tbody class="table-striped">
                        <tr v-for="(task, index) in completeList" :key="task._id">
                            <th scope="row">{{index}}</th>
                            <td>{{task.valueInput}}</td>
                            <td>{{task._id}}</td>
                            <td><input type="checkbox" class="form-check-input" v-on:change="doCheck(task._id, index,'complete')" checked></td>
                            <td><button class="btn btn-outline-danger" v-on:click="removeTask(task._id,index,'complete')">remove</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        setup(props, {emit}){

        },
        data() {

            return {
                toDoListFull:[],
                valueInput:'',
                needDoList:[],
                completeList:[]
            }
        },
        methods: {

            async getTask(){
                let result = await axios({
                    url: 'http://localhost:3000/api/records',
                    method: 'get',
                });
                this.toDoListFull=result.data
                console.log('needDoList2', this.toDoListFull)
                this.needDoList = this.toDoListFull.filter(item => item.need === false);
                this.completeList= this.toDoListFull.filter(item => item.need === true);

            },
            taskInput(event){
                this.valueInput = event.target.value;
            },
            async addTask(){
                if(this.valueInput ==='') {return};
                console.log(await axios({
                        url: 'http://localhost:3000/api/records',
                        method: 'post',
                        data: {
                            valueInput: this.valueInput,
                            need: false,
                        }
                    }
                ));
                this.getTask()
                console.log(this.needDoList);
                this.valueInput='';
            },
            async doCheck(id,index, type){
                let task
                if(type ==='need'){
                    task = this.needDoList.splice(index,1);
                    this.completeList.push(...task);
                    task.need = true
                    console.log(task)
                }
                else{
                    task = this.completeList.splice(index,1);
                    this.needDoList.push(...task);
                    task.need = false

                }
                console.log(task)
                console.log(await axios({
                        //урл добавить id
                        url: 'http://localhost:3000/api/records/'+id,
                        method: 'put',
                        data: {
                            _id: id,
                            need: task.need,
                        }
                    }
                ))
            },
            async removeTask(id,index,type){
                if(type ==='need'){
                    this.needDoList.splice(index,1);
                }
                else{
                    this.completeList.splice(index,1);
                }
                console.log(await axios({
                        //урл добавить id
                        url: 'http://localhost:3000/api/records/'+id,
                        method: 'delete',
                        data: {
                            _id: id,
                        }
                    }
                ))

            }
        },
        mounted() {
            this.getTask()

        },
    }
</script>

<style scoped>

</style>