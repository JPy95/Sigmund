create database sigmund;
use sigmund;

create table alunos (
	dataInclusao datetime not null,
    idAluno int primary key auto_increment,
    nomeAluno nvarchar(100) not null,
    email nvarchar(100) not null
);
create table projetos(
	dataInclusao datetime not null,
    idProjeto int primary key auto_increment,
    nomeProjeto nvarchar(200) not null
);
create table grupos(
	num_grupo int not null,
    id_projeto int not null,
    id_aluno int not null
);
create table questionarios(
	idQuestionario int primary key auto_increment,
    quest1 int not null,
    quest2 int not null,
    quest3 int not null,
    quest4 int not null,
    quest5 int not null,
    quest6 int not null,
    quest7 int not null,
    quest8 int not null,
    quest9 int not null,
    quest10 int not null,
    quest11 int not null,
    quest12 int not null,
    id_aluno int not null
);
-- FK Grupos
ALTER TABLE GRUPOS ADD CONSTRAINT FK_PROJETOS_GRUPOS FOREIGN KEY(id_projeto) REFERENCES
projetos(idProjeto);
ALTER TABLE GRUPOS ADD CONSTRAINT FK_ALUNOS_GRUPOS FOREIGN KEY(id_aluno) REFERENCES
alunos(idAluno);
-- FK Questionario
ALTER TABLE QUESTIONARIOS ADD CONSTRAINT FK_ALUNOS_QUESTIONARIOS FOREIGN KEY(id_aluno) REFERENCES
alunos(idAluno);
