export default function User() {
  return (
    <div>
      <h1>Hello, Next.js!</h1>
      <form action="/users">
        <input type="text" name="username" placeholder="Create a new user" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
