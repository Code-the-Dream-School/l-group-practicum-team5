// Runs with `npm run migrate:up`
// Creates the database tables and related setup
exports.up = (pgm) => {
  pgm.sql(`
    CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;

    CREATE TABLE public.users
    (
        id            bigint GENERATED ALWAYS AS IDENTITY
            CONSTRAINT users_pk
                PRIMARY KEY,
        name          varchar(100)                           NOT NULL,
        email         public.citext                           NOT NULL
            CONSTRAINT users_email_uk
                UNIQUE,
        password_hash text                                   NOT NULL,
        created_at    timestamp with time zone DEFAULT now() NOT NULL,
        updated_at    timestamp with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE public.groups
    (
        id          bigint GENERATED ALWAYS AS IDENTITY
            CONSTRAINT groups_pk
                PRIMARY KEY,
        name        varchar(100)                           NOT NULL
            CONSTRAINT groups_name_uk
                UNIQUE,
        invite_code varchar(20)                            NOT NULL
            CONSTRAINT groups_invite_code_uk
                UNIQUE,
        created_by  bigint                                 NOT NULL
            CONSTRAINT groups_created_by_users_fk
                REFERENCES public.users (id),
        created_at  timestamp with time zone DEFAULT now() NOT NULL,
        updated_at  timestamp with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX groups_created_by_idx
        ON public.groups (created_by);

    CREATE TABLE public.group_members
    (
        id        bigint GENERATED ALWAYS AS IDENTITY
            CONSTRAINT group_members_pk
                PRIMARY KEY,
        group_id  bigint                                 NOT NULL
            CONSTRAINT group_members_group_id_fk
                REFERENCES public.groups (id)
                ON DELETE CASCADE,
        user_id   bigint                                 NOT NULL
            CONSTRAINT group_members_user_id_fk
                REFERENCES public.users (id)
                ON DELETE CASCADE,
        joined_at timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT group_members_uk
            UNIQUE (group_id, user_id)
    );

    CREATE INDEX group_members_user_id_idx
        ON public.group_members (user_id);

    CREATE TABLE public.ideas
    (
        id          bigint GENERATED ALWAYS AS IDENTITY
            CONSTRAINT ideas_pk
                PRIMARY KEY,
        group_id    bigint                                 NOT NULL
            CONSTRAINT ideas_group_id_fk
                REFERENCES public.groups (id)
                ON DELETE CASCADE,
        title       varchar(150)                           NOT NULL,
        description text,
        created_by  bigint                                 NOT NULL
            CONSTRAINT ideas_users_id_fk
                REFERENCES public.users (id),
        created_at  timestamp with time zone DEFAULT now() NOT NULL,
        updated_at  timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT ideas_created_by_group_member_fk
            FOREIGN KEY (group_id, created_by)
                REFERENCES public.group_members (group_id, user_id)
    );

    CREATE INDEX ideas_group_id_idx
        ON public.ideas (group_id);

    CREATE TABLE public.events
    (
        id          bigint GENERATED ALWAYS AS IDENTITY
            CONSTRAINT events_pk
                PRIMARY KEY,
        group_id    bigint                                 NOT NULL
            CONSTRAINT events_group_id_fk
                REFERENCES public.groups (id)
                ON DELETE CASCADE,
        title       varchar(150)                           NOT NULL,
        description text,
        event_date  timestamp with time zone               NOT NULL,
        status      varchar(20)                            NOT NULL
            CONSTRAINT events_status_check
                CHECK (status IN ('planned', 'cancelled', 'completed')),
        created_by  bigint                                 NOT NULL
            CONSTRAINT events_users_id_fk
                REFERENCES public.users (id),
        created_at  timestamp with time zone DEFAULT now() NOT NULL,
        updated_at  timestamp with time zone DEFAULT now() NOT NULL,
        CONSTRAINT events_created_by_group_member_fk
            FOREIGN KEY (group_id, created_by)
                REFERENCES public.group_members (group_id, user_id)
    );

    CREATE INDEX events_group_id_event_date_idx
        ON public.events (group_id, event_date);

    CREATE OR REPLACE FUNCTION public.set_updated_at()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
    $$;

    CREATE TRIGGER users_set_updated_at
        BEFORE UPDATE
        ON public.users
        FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

    CREATE TRIGGER groups_set_updated_at
        BEFORE UPDATE
        ON public.groups
        FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

    CREATE TRIGGER ideas_set_updated_at
        BEFORE UPDATE
        ON public.ideas
        FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

    CREATE TRIGGER events_set_updated_at
        BEFORE UPDATE
        ON public.events
        FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
  `);
};

// Runs with `npm run migrate:down`
// Removes what this migration created
exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE IF EXISTS public.events CASCADE;
    DROP TABLE IF EXISTS public.ideas CASCADE;
    DROP TABLE IF EXISTS public.group_members CASCADE;
    DROP TABLE IF EXISTS public.groups CASCADE;
    DROP TABLE IF EXISTS public.users CASCADE;

    DROP FUNCTION IF EXISTS public.set_updated_at() CASCADE;
    DROP EXTENSION IF EXISTS citext;
  `);
};
