<template>
  <div class="c-navbar">
    <router-link to="/agenda">
      <Icon class="c-navbar__logo" name="aries" :size="50" />
    </router-link>
    <nav class="c-navbar__nav">
      <ul class="c-navbar__ul">
        <li
          v-for="item in nav"
          :key="item.icon"
          class="c-navbar__li c-navbar__link"
        >
          <router-link v-if="item.to" :to="item.to">
            {{ item.name }}
          </router-link>
          <span v-else>{{ item.name }}</span>
        </li>
        <li class="c-navbar__li c-navbar__link">
          <Dropdown
            placement="bottom-end"
            :items="userOptions"
            :change-name-on-select="false"
            @change="chooseUserOption"
          >
            <!-- <Icon name="aries" :size="30" /> -->
            <img
              style="width: 30px; border-radius: 8px"
              :src="$store.auth.user.avatar_url"
            />
          </Dropdown>
        </li>
      </ul>
      <Button class="c-navbar__menu-toggle" @click="showMenuModal">
        <Icon name="menu-toggle" />
      </Button>
    </nav>
    <Modal v-if="menuModal" @close="closeMenuModal">
      <template v-slot:header>
        <div class="c-navbar__modal-nav">
          <router-link to="/agenda" @click="closeMenuModal">
            <Icon class="c-navbar__logo" name="aries" :size="30" />
          </router-link>
        </div>
      </template>
      <ul class="c-navbar__modal-ul">
        <li
          v-for="item in nav"
          :key="item.icon"
          class="c-navbar__modal-li"
          @click="closeMenuModal"
        >
          <router-link
            class="c-navbar__modal-li-content"
            v-if="item.to"
            :to="item.to"
          >
            <div class="v--flex v--flex-align-middle">
              <Icon :name="item.icon" size="13" />
              <Spacing left="1">
                {{ item.name }}
              </Spacing>
            </div>
            <Icon name="chevron-right" size="14" />
          </router-link>
          <span v-else>{{ item.name }}</span>
        </li>
      </ul>
      <Spacing vertical="2">
        <Line />
      </Spacing>
      <ul class="c-navbar__modal-ul">
        <li
          v-for="item in userOptions"
          :key="item.name"
          class="c-navbar__modal-li"
          @click="chooseUserOption(item)"
        >
          <router-link
            v-if="item.to"
            :to="item.to"
            class="c-navbar__modal-li-content"
          >
            <div class="v--flex v--flex-align-middle">
              <Icon :name="item.icon" size="13" />
              <Spacing left="1">
                {{ item.name }}
              </Spacing>
            </div>
            <Icon name="chevron-right" size="14" />
          </router-link>
          <span v-else class="v--flex v--flex-align-middle">
            <span class="c-navbar__modal-li-content">
              <div class="v--flex v--flex-align-middle">
                <Icon :name="item.icon" size="13" />
                <Spacing left="1">
                  {{ item.name }}
                </Spacing>
              </div>
            </span>
          </span>
        </li>
      </ul>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      siacModal: false,
      menuModal: false,
    };
  },
  computed: {
    nav() {
      return [
        { name: "Agenda", to: "/agenda", icon: "calendar" },
        { name: "Leituras", to: "/leituras", icon: "book-open" },
      ];
    },
    userOptions() {
      return [
        // {
        //   name: "Minhas leituras",
        //   to: "/leituras?assignee=" + this.$store.auth.user.login,
        //   icon: "book-open",
        // },
        { name: "Sair", value: "logout", icon: "log-out" },
      ];
    },
  },
  methods: {
    chooseUserOption(item) {
      if (item.value) {
        this[item.value](item);
      }
      this.closeMenuModal();
    },
    logout() {
      this.$store.auth.logout();
    },
    closeSiacModal() {
      this.siacModal = false;
    },
    showMenuModal() {
      this.menuModal = true;
    },
    closeMenuModal() {
      this.menuModal = false;
    },
  },
};
</script>

<style src="./style.styl" lang="stylus" scoped />
