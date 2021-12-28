class RegisterView {

    constructor(parent_container) {
        this.parent_container = parent_container;
        this.onRegisterFn = () => { }
    }

    onRegister(onRegisterFn) {
        this.onRegisterFn = onRegisterFn
        return this;
    }

    render() {
        $(`${this.parent_container}`).html(`
            <div id="register-view" class="container">
                <div class="row">
                    <div class="col-lg-12" style="text-align:center">
                        <h2>Hallo! Wie ben je?</h2>
                        <p><br/><br/></p>
                    </div> <!-- end of col -->
                </div> 
                <div class="row">
                    <div class="col-lg-12">
                        <div class="text-container" style="margin-top: 0px;">
                            <input class="input-solid-reg" name="player-name" type="text" placeholder="Speler naam" />
                            <br/><br/>
                            <a class="btn-solid-lg" style="margin-bottom: 0px;" id="register">DOE MEE!</a>
                        </div>
                    </div> <!-- end of col -->
                </div> <!-- end of row -->
            </div> <!-- end of container -->
        `)

        $("#register").on('click', (e) => {
            e.preventDefault();
            this.onRegisterFn();
        })

        return $('#register-view').fadeIn(500).promise()
    }

    hide() {
      return $('#register-view').fadeOut(500).promise()
    }
}

export default RegisterView;