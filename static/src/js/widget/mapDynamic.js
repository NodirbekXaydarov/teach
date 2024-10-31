/** @odoo-module **/
import {registry} from "@web/core/registry";
import {Component, onMounted, useRef} from "@odoo/owl";

class MapChart extends Component {
    setup() {
        this.root = useRef("root");
        onMounted(() => {
            this.initializeMap();
        });
        this.regions = [
            {id: 1, name: "Shaxrisabz12", path: "M242.676 399.354C241.181 400.435 239.604 401.399 237.96 402.237C235.772 403.275 234.508 403.503 233.583 401.318L233.472 396.823L231.401 389.327L224.952 388.179V378.726C224.952 378.726 218.281 377.806 216.783 376.423C215.94 375.734 215.402 374.74 215.285 373.657H213.558L212.523 375.96L209.07 373.885L209.188 371.811L204.927 370.199L203.201 367.316L200.674 367.087L199.749 362.012L197.332 359.937C197.332 359.937 196.296 353.14 198.713 350.837C201.13 348.534 208.497 344.378 208.497 344.378L209.65 337.352C211.432 337.205 213.172 336.736 214.788 335.969L219.324 336.923C219.324 336.923 221.271 340.201 221.844 341.584C222.417 342.967 221.271 345.733 223.225 348.735C225.179 351.736 227.714 354.841 228.404 355.996C229.095 357.15 228.404 359.453 228.404 359.453C228.404 359.453 231.856 359.453 233.237 362.102C234.063 363.902 234.305 365.917 233.928 367.862L236.579 370.054C236.579 370.054 241.869 377.543 241.986 379.964C242.111 382.91 241.879 385.862 241.296 388.753C240.722 390.945 240.605 395.786 240.605 395.786L242.676 399.354Z", color: "#A6C555"},
            {id: 2, name: "Shaxrisabz11", path: "M275.012 349.91C274.027 351.659 272.742 353.221 271.215 354.522L267.534 350.947C267.534 350.947 264.655 351.41 263.509 349.108H261.092V351.293L257.294 357.98L259.939 358.326C260.194 358.979 260.296 359.683 260.236 360.382C260.176 361.081 259.956 361.757 259.594 362.357H257.522L257.985 364.549H259.366C259.522 365.048 259.541 365.579 259.419 366.087C259.297 366.595 259.04 367.06 258.675 367.433C257.405 368.581 257.294 369.272 257.294 369.272L252.917 368.125L251.425 366.506L250.155 367.544L247.393 365.704L246.702 367.433L244.403 367.198C244.403 367.198 246.012 369.618 244.285 370.545C242.559 371.471 241.523 369.853 241.178 369.964C240.833 370.075 236.58 370.082 236.58 370.082L233.928 367.889C234.305 365.944 234.063 363.93 233.238 362.129C231.857 359.481 228.404 359.481 228.404 359.481C228.404 359.481 229.095 357.171 228.404 356.023C227.714 354.875 225.186 351.756 223.225 348.762C221.264 345.768 222.425 342.995 221.845 341.612C221.264 340.229 219.324 336.951 219.324 336.951L235.544 340.346C235.544 340.346 239.107 344.495 241.413 345.878C243.719 347.261 253.952 345.069 253.952 345.069L261.202 345.878L262.335 340.644L271.795 343.804H275.82C275.903 345.982 275.882 348.402 275.012 349.91Z", color: "#E5AB59"},
            {id: 3, name: "Shaxrisabz10", path: "M237.745 350.148C237.861 349.622 237.653 349.077 237.217 348.762L236.199 348.028C235.851 347.777 235.412 347.687 234.993 347.782L234.824 347.82C234.569 347.878 234.345 348.029 234.195 348.244L234.18 348.266C233.926 348.629 233.467 348.785 233.045 348.653C232.433 348.46 231.799 348.878 231.733 349.517L231.678 350.051C231.637 350.446 231.759 350.84 232.017 351.142L232.72 351.968C232.842 352.111 232.951 352.265 233.046 352.427C233.519 353.234 234.319 353.795 235.239 353.965L236.035 354.112C236.492 354.196 236.962 354.07 237.314 353.767C237.374 353.716 237.429 353.661 237.48 353.601L237.741 353.297C237.855 353.164 238.009 353.074 238.179 353.038L238.203 353.033C238.551 352.96 238.802 352.654 238.806 352.298C238.81 352.023 238.663 351.767 238.425 351.63L238.243 351.526C237.819 351.284 237.602 350.793 237.708 350.316L237.745 350.148Z", color: "#F5F050"},
            {id: 4, name: "Yakkabog9", path: "M234.038 257.018C233.23 255.863 230.358 255.863 228.169 255.289C225.98 254.715 225.524 257.018 225.524 257.018L223.798 256.444L227.016 237.538C224.705 236.358 222.274 235.431 219.765 234.772C215.74 233.734 203.428 234.198 199.286 234.198C195.312 234.159 191.363 233.578 187.547 232.469C185.241 231.66 183.169 232.932 180.062 232.815C176.955 232.697 174.083 231.314 168.324 230.968C163.705 230.692 144.385 234.654 135.871 235.982C134.581 236.254 133.267 236.391 131.949 236.39C129.877 235.927 121.129 224.288 121.129 224.288L123.891 220.831L125.286 190.978C125.286 190.978 129.429 193.17 133.799 192.015C138.17 190.86 138.288 184.982 138.288 184.982H161.309C161.309 184.982 154.286 158.594 154.058 158.248C153.831 157.902 181.678 158.705 181.678 158.705L178.336 79.7607L203.428 80.4522L197.635 13.8727C205.983 9.72353 218.771 3.49986 221.954 2.88441C226.788 1.96468 231.159 -1.72803 234.728 4.73076C238.298 11.1896 241.979 18.326 244.741 22.4752C247.503 26.6243 268.217 44.1474 268.217 44.1474C268.217 44.1474 280.183 84.7119 280.874 84.7119C281.564 84.7119 299.289 76.6488 299.289 76.6488L300.208 134.045C300.208 134.045 295.146 128.969 295.146 130.352V140.725L293.765 143.263C293.765 143.263 292.847 171.152 293.765 170.924C294.684 170.695 329.208 175.301 329.208 175.301L334.504 234.772H337.729L344.862 256.444H339.338C339.469 256.444 339.676 259.653 339.835 262.377H337.957L337.612 266.008L336.286 265.717V263.124L333.524 263.414L332.205 267.273L331.224 266.99V263.878L330.133 264.106L330.417 266.181L329.726 267.273H328.235L328.173 265.779L328.808 264.507L328.463 263.414L327.026 263.643L326.508 265.261L327.254 266.582L325.928 266.872L325.528 265.434V264.334L324.03 264.825L323.284 265.952L321.095 265.607L319.314 266.409L317.933 265.199L318.913 264.396L320.349 264.279L319.141 263.013L317.187 263.587L317.933 261.803H316.724L314.825 262.605L313.79 262.723V261.34L311.663 261.803L311.083 262.841L308.666 262.605C308.255 262.844 307.81 263.019 307.347 263.124C307.113 263.069 301.589 263.297 301.589 263.297L299.289 265.088V266.298L297.563 266.063C297.563 266.063 297.335 264.625 297.218 264.798C297.1 264.97 295.146 266.298 295.146 266.298L292.958 266.409L291.293 266.99L290.541 265.952L288.359 266.236C288.359 266.236 288.414 267.163 288.069 267.273C287.724 267.384 285.479 266.236 285.479 266.236C285.479 266.236 282.144 264.853 281.799 264.853C281.454 264.853 274.432 264.279 274.432 264.279L271.324 267.619L249.574 257.709C249.648 259.181 249.243 260.637 248.421 261.859C247.04 263.933 238.063 263.124 237.028 262.896C235.992 262.668 234.846 258.173 234.038 257.018Z", color: "#F74931"},
            {id: 5, name: "Yakkabog8", path: "M348.083 278.337L344.858 277.936V280.356C344.38 280.384 343.9 280.384 343.422 280.356C343.021 279.734 342.675 279.08 342.386 278.399L341.005 277.991L338.699 279.374H336.918L335.364 278.309L333.638 278.655C333.638 278.655 333.755 277.908 333.52 277.68C333.286 277.451 331.967 277.507 331.967 277.507L331.566 279.346C331.566 279.346 329.032 279.408 328.804 279.346C328.576 279.284 330.013 278.482 330.013 278.482L329.495 277.507L326.961 277.099C326.961 277.099 328.342 276.061 328.632 275.833C328.922 275.605 326.85 274.969 326.85 274.969L325.58 276.525H324.261V274.506L322.88 273.295L321.782 273.759H319.945L319.538 272.32H318.157L317.874 274.049L313.841 274.16L311.079 275.66L309.761 274.104L308.207 275.66L307.171 274.16L304.692 276.407L302.22 276.525L301.647 275.605L294.853 275.66L293.644 274.395L291.98 274.914L290.537 273.876L287.257 274.104L286.567 271.739L283.971 270.066L285.476 266.207C285.476 266.207 287.72 267.362 288.065 267.245C288.411 267.127 288.355 266.207 288.355 266.207L290.537 265.924L291.29 266.961L292.954 266.38L295.143 266.27C295.143 266.27 297.097 264.942 297.214 264.769C297.332 264.596 297.56 266.034 297.56 266.034L299.286 266.27V265.059L301.585 263.268C301.585 263.268 307.109 263.04 307.344 263.096C307.807 262.99 308.252 262.815 308.663 262.577L311.079 262.812L311.659 261.775L313.786 261.311V262.694L314.822 262.577L316.721 261.775H317.929L317.183 263.586L319.137 263.013L320.346 264.278L318.91 264.396L317.929 265.198L319.31 266.408L321.091 265.606L323.28 265.951L324.026 264.824L325.524 264.333V265.433L325.925 266.871L327.251 266.581L326.505 265.26L327.023 263.642L328.459 263.414L328.804 264.506L328.169 265.779L328.231 267.272H329.723L330.413 266.18L330.13 264.105L331.221 263.877V266.989L332.201 267.272L333.52 263.414L336.282 263.123V265.716L337.608 266.007L337.953 262.376H339.831C339.942 264.382 340.025 266.124 340.025 266.124L348.083 278.337Z", color: "#E5AB59"},
            {id: 6, name: "Skjghd7", path: "M349 293.322C349 293.322 344.629 295.86 343.939 300.238C343.248 304.615 344.167 312.457 343.476 314.76C342.786 317.062 342.095 319.6 342.095 319.6L336.799 318.791L336.109 317.18L337.835 316.371L337.49 314.988L334.382 315.105C334.382 315.105 333.581 311.765 331.738 311.648C329.894 311.53 327.712 311.184 326.904 309.919C326.097 308.653 326.677 305.77 326.677 305.77C324.792 306.024 322.875 305.906 321.035 305.424C318.619 304.615 316.43 303.467 316.43 303.813C316.43 304.159 317.238 307.727 316.775 308.764C316.312 309.801 312.632 313.148 312.632 313.148L312.404 316.025L313.212 317.18L312.176 318.335V321.211L313.095 322.594L312.749 323.867H310.561L310.45 325.941L311.251 327.435L310.678 329.973L311.251 332.393L308.952 334.35L303.773 331.128L302.275 328.707L296.178 327.781L295.259 323.978L292.38 322.138L291.116 326.17L288.009 326.861V324.669L284.094 323.749C284.094 323.749 284.211 326.287 283.176 326.979C282.14 327.67 279.723 326.979 278.342 329.51C276.961 332.041 275.925 334.005 277.189 334.931C278.453 335.858 280.068 336.197 279.488 337.925C278.908 339.654 276.271 338.043 275.691 339.191C275.408 339.765 275.656 341.667 275.774 343.803H271.783L262.323 340.643L257.282 338.963L255.439 337.116L253.83 340.809L249.569 339.654L250.833 334.696L239.613 327.511L233.916 323.867L234.724 319.026L235.642 312.222L238.749 311.074L239.44 306.807L240.71 304.85V300.583L249.342 301.503L248.534 298.391L248.306 290.328L249.342 288.018V285.024C249.342 285.024 251.986 282.604 257.047 282.03C262.109 281.456 273.509 286.179 273.509 286.179L277.88 285.716L283.97 270.094L286.566 271.768L287.256 274.133L290.536 273.905L291.979 274.942L293.643 274.423L294.852 275.689L301.646 275.633L302.219 276.553L304.691 276.436L307.17 274.188L308.206 275.689L309.76 274.133L311.078 275.689L313.84 274.188L317.873 274.077L318.156 272.349H319.537L319.944 273.787H321.781L322.879 273.324L324.26 274.534V276.553H325.579L326.849 274.997C326.849 274.997 328.921 275.633 328.631 275.862C328.341 276.09 326.96 277.127 326.96 277.127L329.494 277.535L330.012 278.51C330.012 278.51 328.575 279.319 328.803 279.374C329.031 279.43 331.565 279.374 331.565 279.374L331.966 277.535C331.966 277.535 333.291 277.473 333.519 277.708C333.747 277.943 333.637 278.683 333.637 278.683L335.363 278.337L336.917 279.402H338.698L341.004 278.019L342.385 278.427C342.674 279.108 343.02 279.763 343.421 280.384C343.899 280.412 344.379 280.412 344.857 280.384V277.964L348.082 278.365L349 293.322Z", color: "#F74931"},
            {id: 7, name: "Shaxrisabz6", path: "M291.028 281.462C290.492 280.921 289.687 280.747 288.976 281.018L287.293 281.657C286.733 281.87 286.291 282.313 286.08 282.873L285.992 283.106C285.862 283.449 285.867 283.829 286.006 284.17L286.018 284.199C286.252 284.776 286.082 285.439 285.598 285.831C284.897 286.4 284.9 287.47 285.604 288.035L286.206 288.517C286.637 288.862 287.188 289.017 287.735 288.948L289.283 288.753C289.547 288.72 289.814 288.709 290.08 288.722L290.112 288.724C291.42 288.785 292.691 288.281 293.6 287.339L294.411 286.5C294.862 286.032 295.076 285.384 294.991 284.739C294.977 284.631 294.954 284.523 294.923 284.418L294.765 283.878C294.696 283.644 294.707 283.393 294.797 283.165L294.804 283.148C294.991 282.676 294.822 282.138 294.399 281.858C294.078 281.646 293.668 281.622 293.324 281.795L293.051 281.933C292.432 282.245 291.683 282.123 291.195 281.631L291.028 281.462Z", color: "#E5AB59"},
            {id: 8, name: "Shaxrisabz5", path: "M171.068 209.851C170.353 209.13 169.281 208.897 168.331 209.258L166.046 210.127C165.326 210.4 164.758 210.969 164.486 211.69L164.452 211.781C164.217 212.403 163.74 212.904 163.129 213.168C162.02 213.649 161.424 214.864 161.724 216.035L161.783 216.265C161.93 216.84 162.26 217.351 162.723 217.722L163.565 218.396C164.825 219.406 166.441 219.862 168.043 219.66L168.741 219.572C169.094 219.528 169.449 219.514 169.804 219.53L169.847 219.532C171.59 219.615 173.285 218.942 174.498 217.687L175.578 216.567C176.181 215.944 176.465 215.08 176.352 214.22C176.333 214.075 176.303 213.932 176.261 213.791L176.05 213.072C175.958 212.759 175.974 212.425 176.094 212.122L176.103 212.098C176.352 211.469 176.127 210.752 175.563 210.379C175.135 210.095 174.588 210.063 174.13 210.294L173.766 210.478C172.941 210.895 171.941 210.732 171.291 210.075L171.068 209.851Z", color: "#F0D562"},
            {id: 9, name: "Shaxrisabz4", path: "M239.633 327.484L237.63 330.527L235.559 340.347L219.332 336.958L214.775 335.99C215.742 335.575 216.432 334.676 216.64 333.639C216.985 330.389 215.051 329.974 215.051 329.628C215.051 329.282 216.087 324.096 215.742 324.234C215.397 324.373 213.187 321.468 213.187 321.468C213.187 321.468 214.085 316.074 216.294 315.383C218.504 314.691 222.854 316.766 223.89 317.941L234.73 319.117L233.902 323.958L239.633 327.484ZM285.481 266.216L277.886 285.717L273.536 286.201C273.536 286.201 262.143 281.498 257.102 282.052C252.062 282.605 249.369 285.025 249.369 285.025L244.397 286.754L238.321 284.472C238.321 284.472 227.135 284.956 224.511 284.472C221.887 283.988 217.261 282.743 217.261 282.743L210.563 278.11L208.285 258.402L204.97 258.263L205.315 264.625C205.315 264.625 197.927 266.354 195.649 266.147C193.37 265.939 185.084 266.7 185.084 266.7V272.785L183.22 277.418L171.965 277.626L161.055 274.376V262.62L157.603 259.508L153.322 260.753L143.931 281.083L135.507 282.466L133.919 278.11L118.59 264.625C118.59 264.625 120.178 256.189 121.835 252.662C123.492 249.135 130.604 246.784 130.95 246.646C131.295 246.507 137.164 248.859 137.164 248.859L135.921 235.996C144.414 234.682 163.748 230.741 168.374 231.017C174.105 231.363 177.005 232.746 180.113 232.885C183.22 233.023 185.291 231.709 187.57 232.539C191.368 233.645 195.303 234.198 199.308 234.268C203.451 234.268 215.742 233.784 219.816 234.821C222.302 235.512 224.787 236.411 227.066 237.587L223.821 256.465L225.547 257.019C225.547 257.019 226.03 254.737 228.171 255.29C230.311 255.843 233.211 255.843 234.04 257.019C234.868 258.194 235.973 262.689 237.009 262.896C238.045 263.104 247.021 263.934 248.402 261.859C249.231 260.614 249.645 259.162 249.576 257.71L271.326 267.599L274.434 264.28C274.434 264.28 281.477 264.833 281.822 264.833C282.167 264.833 285.481 266.216 285.481 266.216Z", color: "#F0D562"},
            {id: 10, name: "Shaxrisabz3", path: "M154.061 158.25C154.289 158.596 161.311 184.984 161.311 184.984H138.29C138.29 184.984 138.18 190.862 133.802 192.017C129.424 193.172 125.288 190.98 125.288 190.98L123.907 220.833L121.145 224.29C121.145 224.29 129.894 235.928 131.965 236.392C133.283 236.393 134.598 236.256 135.887 235.984L137.144 248.839C137.144 248.839 131.275 246.529 130.93 246.647C130.584 246.765 123.445 249.067 121.836 252.643C120.227 256.218 118.611 264.627 118.611 264.627L92.6074 251.716L84.2041 252.179C84.2041 252.179 79.4881 240.195 77.9897 238.121C76.4913 236.046 63.2615 221.981 63.2615 221.981L59.5743 211.497C59.5743 211.497 48.0707 214.491 45.1914 215.065C42.3121 215.639 30.4563 217.174 30.118 217.257C30.4632 217.257 10.6669 188.331 8.94064 185.102C7.21442 181.872 1 169.079 1 169.079C1 169.079 11.0121 163.091 13.4288 162.164C15.8455 161.237 24.0141 157.669 24.0141 157.669C24.0141 157.669 20.7964 155.021 20.3337 153.866C19.8711 152.711 15.1551 140.035 15.1551 140.035C15.1551 140.035 15.0377 118.024 18.4901 106.386L58.5386 42.5312L43.2373 35.8511L35.2967 24.7868L111.479 10.4931C111.479 10.4931 164.418 17.8716 190.194 17.6365C190.194 17.6365 193.322 16.0321 197.638 13.8746L203.431 80.4541L178.339 79.7626L181.681 158.706C181.681 158.706 153.826 157.904 154.061 158.25Z", color: "#A6C555"},
            {id: 11, name: "Shaxrisabz1", path: "M309.537 348.181L306.547 353.139L307.12 355.214L306.319 356.714C306.319 356.714 303.212 357.171 302.287 357.406C301.362 357.641 301.141 359.363 301.141 359.363C299.437 359.245 297.726 359.402 296.073 359.826C293.773 360.518 293.311 361.783 293.311 361.783H289.748L287.331 360.746C287.071 361.163 286.686 361.488 286.231 361.674C285.776 361.86 285.274 361.898 284.797 361.783C283.188 361.32 282.608 359.245 282.608 359.245C282.608 359.245 276.739 360.282 273.977 357.98C271.215 355.677 271.215 354.522 271.215 354.522C272.742 353.221 274.028 351.659 275.013 349.91C275.883 348.402 275.903 345.982 275.786 343.804C275.669 341.625 275.42 339.765 275.703 339.191C276.283 338.043 278.928 339.654 279.501 337.926C280.074 336.197 278.465 335.851 277.201 334.931C275.938 334.012 276.974 332.048 278.354 329.51C279.735 326.972 282.152 327.67 283.188 326.979C284.224 326.287 284.106 323.75 284.106 323.75L288.021 324.669V326.861L291.129 326.17L292.392 322.138L295.272 323.978L296.19 327.781L302.287 328.708L303.785 331.128L308.964 334.351L309.882 336.66C309.882 336.66 305.284 341.383 304.704 343.575C304.124 345.767 304.131 349.564 305.739 349.799C307.348 350.034 307.928 347.607 307.928 347.607L309.537 348.181Z", color: "#A6C555"},
            {id: 12, name: "Shaxrisabz2", path: "M262.334 340.642L261.202 345.877L253.951 345.068C253.951 345.068 243.711 347.26 241.412 345.877C239.113 344.494 235.543 340.345 235.543 340.345L237.614 330.546L239.624 327.51L250.844 334.695L249.581 339.653L253.841 340.808L255.45 337.116L257.293 338.962L262.334 340.642Z", color: "#E5AB59"},
        ];
    }

    initializeMap() {
        const container = this.root.el;
        const regions = container.querySelectorAll(".region");
        const infoBox = container.querySelector(".info-box");
        document.body.appendChild(infoBox);
        const handleMouseOver = (e) => {
            const name = e.target.getAttribute("data-name");
            infoBox.textContent = name;
            infoBox.style.cssText = `
                display: block;
                position: fixed;
                left: ${e.clientX + 10}px;
                top: ${e.clientY + 10}px;
                background: white;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                z-index: 9999;
                pointer-events: none;
            `;
        };

        const handleMouseOut = () => {
            infoBox.style.display = "none";
        };

        const handleMouseMove = (e) => {
            infoBox.style.left = (e.clientX + 10) + "px";
            infoBox.style.top = (e.clientY + 10) + "px";
        };

        regions.forEach(region => {
            region.addEventListener("mouseover", handleMouseOver);
            region.addEventListener("mouseout", handleMouseOut);
            region.addEventListener("mousemove", handleMouseMove);
        });
    }
}

MapChart.template = 'teach.MapDynamic';
registry.category("fields").add("MapDynamic", {
    component: MapChart,
});