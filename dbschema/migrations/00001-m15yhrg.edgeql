CREATE MIGRATION m15yhrgtwzbhtupwd4cgu4k5jm3tsomffg2dcq5ay7r5ay5w7f3ura
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE SCALAR TYPE default::Role EXTENDING enum<admin, user>;
  CREATE TYPE default::User {
      CREATE REQUIRED MULTI LINK identities: ext::auth::Identity {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY userRole: default::Role {
          SET default := 'user';
      };
      CREATE ACCESS POLICY everyone_select_insert_update_only
          ALLOW SELECT, UPDATE, INSERT ;
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (GLOBAL ext::auth::ClientTokenIdentity IN .identities)
  )));
  CREATE TYPE default::Item {
      CREATE ACCESS POLICY admin_has_full_access
          ALLOW ALL USING (((GLOBAL default::current_user).userRole ?= default::Role.admin));
      CREATE REQUIRED LINK created_by: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE ACCESS POLICY creator_has_full_access
          ALLOW ALL USING ((.created_by ?= GLOBAL default::current_user));
      CREATE ACCESS POLICY others_read_only
          ALLOW SELECT ;
      CREATE PROPERTY created: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY updated: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::User {
      CREATE ACCESS POLICY admin_has_full_access
          ALLOW ALL USING (((GLOBAL default::current_user).userRole ?= default::Role.admin));
      CREATE ACCESS POLICY current_user_has_full_access
          ALLOW ALL USING ((.id ?= (GLOBAL default::current_user).id));
  };
};
