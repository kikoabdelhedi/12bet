PGDMP                         |            bet    15.7    15.7     �	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �	           1262    16386    bet    DATABASE     e   CREATE DATABASE bet WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE bet;
             	   bet_owner    false             
           0    0    DATABASE bet    ACL     -   GRANT ALL ON DATABASE bet TO neon_superuser;
                	   bet_owner    false    2559            �            1259    24576    events    TABLE     {   CREATE TABLE public.events (
    name character varying,
    live_time character varying,
    score character varying[]
);
    DROP TABLE public.events;
       public         heap 	   bet_owner    false            �            1259    24581    slipbet    TABLE     �   CREATE TABLE public.slipbet (
    match_info jsonb[],
    price numeric,
    userid integer,
    totalcote numeric,
    totalbonus numeric,
    totalwin numeric,
    login text
);
    DROP TABLE public.slipbet;
       public         heap 	   bet_owner    false            �            1259    24592    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       	   bet_owner    false            �            1259    24593    users    TABLE       CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    login character varying(255) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    balance numeric DEFAULT 0
);
    DROP TABLE public.users;
       public         heap 	   bet_owner    false    216            �	          0    24576    events 
   TABLE DATA           8   COPY public.events (name, live_time, score) FROM stdin;
    public       	   bet_owner    false    214   �       �	          0    24581    slipbet 
   TABLE DATA           d   COPY public.slipbet (match_info, price, userid, totalcote, totalbonus, totalwin, login) FROM stdin;
    public       	   bet_owner    false    215          �	          0    24593    users 
   TABLE DATA           I   COPY public.users (id, login, password, created_at, balance) FROM stdin;
    public       	   bet_owner    false    217           
           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public       	   bet_owner    false    216            e	           2606    24604    users users_login_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_login_key;
       public         	   bet_owner    false    217            g	           2606    24602    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         	   bet_owner    false    217            �           826    16388     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     |   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            �           826    16387    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     y   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES  TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            �	      x������ � �      �	      x������ � �      �	      x������ � �     