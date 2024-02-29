<template>
  <div v-if="isVisible" class="notification" :class="notificationType">
    {{ message }}
  </div>
</template>

<script>
export default {
  name:'NotificComp',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      isVisible: true
    };
  },
  computed: {
    notificationType() {
      return 'notification-' + this.type;
    }
  },
  mounted() {
    setTimeout(() => {
      this.closeNotification();
    }, this.duration);
  },
  methods: {
    closeNotification() {
      this.isVisible = false;
    }
  }
};
</script>


<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.notification-info {
  background-color: #007bff;
}

.notification-success {
  background-color: #28a745;
}

.notification-error {
  background-color: #dc3545;
}

.notification-warning {
  background-color: #ffc107;
}

.notification.closed {
  opacity: 0;
}
</style>
