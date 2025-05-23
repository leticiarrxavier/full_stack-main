const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const Carro = require("../models/Carro");

router.get("/", (req, res) => res.redirect("/projects"));

router.get("/projects", (req, res) => res.render("projetos"));

router.get("/cadastro", (req, res) => res.render("cadastro"));
router.post("/cadastro", async (req, res) => {
  await Usuario.create(req.body);
  res.redirect("/login");
});

router.get("/login", (req, res) => res.render("login"));

router.get("/carros", async (req, res) => {
  const carros = await Carro.find();
  res.render("carros", { carros });
});

router.get("/gerenciar-carros", async (req, res) => {
  const carros = await Carro.find();
  res.render("gerenciar-carros", { carros });
});

router.get("/carros/novo", (req, res) => res.render("novo-carro"));
router.post("/carros/novo", async (req, res) => {
  await Carro.create(req.body);
  res.redirect("/gerenciar-carros");
});

router.get("/carros/editar/:id", async (req, res) => {
  const carro = await Carro.findById(req.params.id);
  res.render("editar-carro", { carro });
});
router.post("/carros/editar/:id", async (req, res) => {
  await Carro.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/gerenciar-carros");
});

router.post("/carros/remover/:id", async (req, res) => {
  await Carro.findByIdAndDelete(req.params.id);
  res.redirect("/gerenciar-carros");
});

router.post("/carros/vender/:id", async (req, res) => {
  const carro = await Carro.findById(req.params.id);
  if (carro.qtde_disponivel > 0) {
    carro.qtde_disponivel -= 1;
    await carro.save();
  }
  res.redirect("/carros");
});

module.exports = router;
