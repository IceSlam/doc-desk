showMenu = () => {
    const MobileMenuWrapper = document.getElementById('mobile-menu')
    const MobileMenuToggler = document.querySelector('.is-navbar__wrapper-left__toggler')
    MobileMenuWrapper.classList.toggle("show")
    MobileMenuToggler.classList.toggle('show')
}
