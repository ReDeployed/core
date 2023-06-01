<script>
  import { ClientDatabaseHandler } from '../clientfunctions'

  let db = new ClientDatabaseHandler();
  console.log(db.api("ping"));
</script>