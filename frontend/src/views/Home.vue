<script>
export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<template>
  <section id="hero" class="d-flex align-items-center">
    <div
      class="container position-relative text-center"
      data-aos="zoom-in"
      data-aos-delay="100"
    >
      <div>
        <div>
          <h1>Welcome to <span>The Grinder</span></h1>
          <h2>Life is short - Drink good coffee</h2>

          <div class="btns">
            <a href="" class="btn-menu animated fadeInUp scrollto">
              <router-link :to="{ name: 'product' }"> Our Menu </router-link></a
            >
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="about">
    <div class="container" data-aos="fade-up">
      <div class="row">
        <div
          class="col-lg-6 order-1 order-lg-2"
          data-aos="zoom-in"
          data-aos-delay="100"
        >
          <div class="about-img">
            <img src="../assets/bussy-coffee-shop.jpg" alt="" />
          </div>
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
          <h3>
            The Grinder sẽ là nơi mọi người xích lại gần nhau, đề cao giá trị
            kết nối con người và sẻ chia thân tình bên những tách cà phê, ly trà
            đượm hương, truyền cảm hứng về lối sống hiện đại.
          </h3>
          <p class="fst-italic">
            Chúng tôi sẽ cùng bạn thưởng thức một bữa cà phê đặc sản Signature
            hợp gu, kể câu chuyện về hành trình của hạt cà phê từ khi còn là hạt
            nhân xanh đến khi trở thành ly cà phê trên tay bạn, kết nối mọi
            người đến gần hơn tới thế giới cà phê dù khách hàng là người ‘mới’
            hay là người đã sành sỏi.
          </p>
          <p>Châm ngôn của chúng tôi:</p>
          <ul>
            <li>
              <i class="bi bi-check-circle"></i> Kết nối mọi người xích lại gần
              nhau hơn.
            </li>
            <li>
              <i class="bi bi-check-circle"></i> Nuôi dưỡng tình yêu với cà phê
              và trà Việt.
            </li>
            <li>
              <i class="bi bi-check-circle"></i> Truyền cảm hứng về lối sống
              hiện đại.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact" style="background-color: black">
    <div class="container" data-aos="fade-up">
      <div class="section-title">
        <h2>Contact</h2>
        <p>Contact Us</p>
      </div>
    </div>

    <div data-aos="fade-up">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.851787489943!2d105.76792766024077!3d10.029086925284652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2sCan%20Tho%20University!5e0!3m2!1sen!2s!4v1649833663355!5m2!1sen!2s"
        width="1700"
        height="450"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div class="container" data-aos="fade-up">
      <div class="row mt-5">
        <div class="col-lg-4">
          <div class="info">
            <div class="address">
              <i class="bi bi-geo-alt"></i>
              <h4>Location:</h4>
              <p>3/2 Street, Ninh Kieu, Can Tho</p>
            </div>

            <div class="open-hours">
              <i class="bi bi-clock"></i>
              <h4>Open Hours:</h4>
              <p>
                Monday-Saturday:<br />
                08:00 AM - 23:00 PM
              </p>
            </div>

            <div class="email">
              <i class="bi bi-envelope"></i>
              <h4>Email:</h4>
              <p>thegrinder@gmail.com</p>
            </div>

            <div class="phone">
              <i class="bi bi-phone"></i>
              <h4>Call:</h4>
              <p>+84 916 773 523</p>
            </div>
          </div>
        </div>

        <div class="col-lg-8 mt-5 mt-lg-0">
          <form method="post" action="page/contact" class="email-form">
            <div class="row">
              <div class="col-md-6 form-group">
                <input
                  type="text"
                  name="your-name"
                  class="form-control"
                  id="name"
                  placeholder="Enter your name.."
                  required
                />
              </div>
              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input
                  type="email"
                  class="form-control"
                  name="your-email"
                  id="email"
                  placeholder="Example: 123@gmail.com"
                  required
                />
              </div>
            </div>
            <div class="form-group mt-3">
              <input
                type="text"
                class="form-control"
                name="your-subject"
                id="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div class="form-group mt-3">
              <textarea
                class="form-control"
                name="your-message"
                rows="8"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <hr />
            <div class="text-center">
              <button type="submit" name="send">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
