<!-- 
  -- Projet: Gestion des stagiaires
  -- Auteur : Tim Allemann
  -- Date : 16.09.2020
  -- Description : Composant racine du projet
  -- Fichier : App.vue
  -->

<template>
  <v-app>
    <AppNav />
    <NotificationContainer />
    <v-main>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppNav from './components/AppNav'
import AppFooter from './components/AppFooter'
import NotificationContainer from '@/components/NotificationContainer.vue'

export default {
  name: 'App',
  components: { AppNav, AppFooter, NotificationContainer }
}
</script>

<style>
/*** TRANSITIONS ***/

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}

.slide-up-enter {
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-leave {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-up-enter-active .slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-move {
  transition: transform 0.8s ease-in;
}
/* Datepicker*/
.rtl {
  direction: rtl;
}
.vdp-datepicker {
  position: relative;
  text-align: left;
}
.vdp-datepicker * {
  box-sizing: border-box;
}
.vdp-datepicker__calendar {
  position: absolute;
  z-index: 100;
  background: #fff;
  width: 300px;
  border: 1px solid #ccc;
}
.vdp-datepicker__calendar header {
  display: block;
  line-height: 40px;
}
.vdp-datepicker__calendar header span {
  display: inline-block;
  text-align: center;
  width: 71.42857142857143%;
  float: left;
}
.vdp-datepicker__calendar header .prev,
.vdp-datepicker__calendar header .next {
  width: 14.285714285714286%;
  float: left;
  text-indent: -10000px;
  position: relative;
}
.vdp-datepicker__calendar header .prev:after,
.vdp-datepicker__calendar header .next:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 6px solid transparent;
}
.vdp-datepicker__calendar header .prev:after {
  border-right: 10px solid #000;
  margin-left: -5px;
}
.vdp-datepicker__calendar header .prev.disabled:after {
  border-right: 10px solid #ddd;
}
.vdp-datepicker__calendar header .next:after {
  border-left: 10px solid #000;
  margin-left: 5px;
}
.vdp-datepicker__calendar header .next.disabled:after {
  border-left: 10px solid #ddd;
}
.vdp-datepicker__calendar header .prev:not(.disabled),
.vdp-datepicker__calendar header .next:not(.disabled),
.vdp-datepicker__calendar header .up:not(.disabled) {
  cursor: pointer;
}
.vdp-datepicker__calendar header .prev:not(.disabled):hover,
.vdp-datepicker__calendar header .next:not(.disabled):hover,
.vdp-datepicker__calendar header .up:not(.disabled):hover {
  background: #eee;
}
.vdp-datepicker__calendar .disabled {
  color: #ddd;
  cursor: default;
}
.vdp-datepicker__calendar .flex-rtl {
  display: flex;
  width: inherit;
  flex-wrap: wrap;
}
.vdp-datepicker__calendar .cell {
  display: inline-block;
  padding: 0 5px;
  width: 14.285714285714286%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {
  cursor: pointer;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid #4bd;
}
.vdp-datepicker__calendar .cell.selected {
  background: #4bd;
}
.vdp-datepicker__calendar .cell.selected:hover {
  background: #4bd;
}
.vdp-datepicker__calendar .cell.selected.highlighted {
  background: #4bd;
}
.vdp-datepicker__calendar .cell.highlighted {
  background: #cae5ed;
}
.vdp-datepicker__calendar .cell.highlighted.disabled {
  color: #a3a3a3;
}
.vdp-datepicker__calendar .cell.grey {
  color: #888;
}
.vdp-datepicker__calendar .cell.grey:hover {
  background: inherit;
}
.vdp-datepicker__calendar .cell.day-header {
  font-size: 75%;
  white-space: nowrap;
  cursor: inherit;
}
.vdp-datepicker__calendar .cell.day-header:hover {
  background: inherit;
}
.vdp-datepicker__calendar .month,
.vdp-datepicker__calendar .year {
  width: 33.333%;
}
.vdp-datepicker__clear-button,
.vdp-datepicker__calendar-button {
  cursor: pointer;
  font-style: normal;
}
.vdp-datepicker__clear-button.disabled,
.vdp-datepicker__calendar-button.disabled {
  color: #999;
  cursor: default;
}

/* Progress bar */
#nprogress .bar {
  background: white !important;
}

#nprogress .spinner-icon {
  border-top-color: white !important;
  border-left-color: white !important;
}

/* Action button layout */
.action-container {
  position: fixed;
  bottom: 10px;
  right: 0;
  padding-right: 20px;
  z-index: 10;
}

/* Striped datatable */
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
