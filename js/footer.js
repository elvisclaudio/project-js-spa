pageLayout.innerHTML += `
        <footer
            class="d-flex flex-wrap justify-content-between align-items-center px-5 py-4 border-top position-fixed start-0 bottom-0  w-100">
            <div class="col-md-4 d-flex align-items-center">
                <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1" aria-label="Bootstrap">
                    <i class="fa-brands fa-bootstrap"></i>
                </a>
                <span class="mb-3 mb-md-0 text-body-secondary">© 2025 Company, Inc</span>
            </div>

            <div class="col-md-4 text-center">
                <ul class="list-unstyled">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Privacy Policy</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Terms of Service</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>
                </ul>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3">
                    <a class="text-body-secondary" href="#" aria-label="Instagram">
                         <i class="fa-brands fa-square-instagram"></i>
                    </a>
                </li>
                <li class="ms-3">
                    <a class="text-body-secondary" href="#" aria-label="Facebook">
                         <i class="fa-brands fa-facebook"></i>
                    </a>
                </li>
            </ul>
        </footer>`;
// footer.js will be inserted into the page layout last, after the home content